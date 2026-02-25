import { NhiemVuKHCN, ChuyenGiao } from '@/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateChuyenGiaoDto } from './dto/create-chuyen_giao.dto';
import { UpdateChuyenGiaoDto } from './dto/update-chuyen_giao.dto';
import { Op, col, where as sequelizeWhere, cast } from 'sequelize';
import { SearchDto } from '@/common/dto/search.dto';

@Injectable()
export class ChuyenGiaoService {
  constructor(
    @InjectModel(ChuyenGiao)
    private readonly chuyenGiaoModel: typeof ChuyenGiao,
  ) {}

  async create(createChuyenGiaoDto: CreateChuyenGiaoDto) {
    await this.chuyenGiaoModel.create(createChuyenGiaoDto as any);
    return;
  }

  async findAll() {
    return await this.chuyenGiaoModel.findAll({
      include: [
        {
          model: NhiemVuKHCN,
          as: 'nhiem_vu_khcn',
          attributes: ['ten'],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  async findOne(id: number) {
    return await this.chuyenGiaoModel.findOne({
      include: [
        {
          model: NhiemVuKHCN,
          as: 'nhiem_vu_khcn',
          attributes: ['ten'],
        },
      ],
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  async update(updateNhiemVuDto: UpdateChuyenGiaoDto, id: number) {
    const alreadyExist = await this.chuyenGiaoModel.findByPk(id);
    if (!alreadyExist)
      throw new BadRequestException('Không tìm thấy thông tin chuyển giao.');

    const updated = await alreadyExist.update(updateNhiemVuDto);
    return updated;
  }

  async delete(id: number) {
    const alreadyExist = await this.chuyenGiaoModel.findByPk(id);
    if (!alreadyExist)
      throw new BadRequestException('Không tìm thấy thông tin chuyển giao.');
    return await this.chuyenGiaoModel.destroy({
      where: { id },
      cascade: true,
    });
  }

  async search(query: SearchDto) {
    const keywords = query.key.split(' ');
    const where = keywords.map((keyword) => ({
      [Op.or]: [
        { '$nhiem_vu_khcn.ten$': { [Op.iLike]: `%${keyword}%` } },
        { dia_chi: { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('tinh_trang'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
      ],
    }));
    return await this.chuyenGiaoModel.findAll({
      include: [
        {
          model: NhiemVuKHCN,
          as: 'nhiem_vu_khcn',
          attributes: ['ten'],
        },
      ],
      where: {
        [Op.and]: where,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }
}
