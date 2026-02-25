import { NhiemVuKHCN, BaiBao } from '@/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBaiBaoDto } from './dto/create-bai_bao.dto';
import { UpdateBaiBaoDto } from './dto/update-bai_bao.dto';
import { Op, col, where as sequelizeWhere, cast } from 'sequelize';
import { SearchDto } from '@/common/dto/search.dto';

@Injectable()
export class BaiBaoService {
  constructor(
    @InjectModel(BaiBao)
    private readonly baiBaoModel: typeof BaiBao,
  ) {}

  async create(createBaiBaoDto: CreateBaiBaoDto) {
    console.log('abc');
    await this.baiBaoModel.create(createBaiBaoDto as any);
    return;
  }

  async findAll() {
    return await this.baiBaoModel.findAll({
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
    return await this.baiBaoModel.findOne({
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

  async update(updateNhiemVuDto: UpdateBaiBaoDto, id: number) {
    const alreadyExist = await this.baiBaoModel.findByPk(id);
    if (!alreadyExist) throw new BadRequestException('Không tìm thấy bài báo.');

    const updated = await alreadyExist.update(updateNhiemVuDto);
    return updated;
  }

  async delete(id: number) {
    const alreadyExist = await this.baiBaoModel.findByPk(id);
    if (!alreadyExist) throw new BadRequestException('Không tìm thấy bài báo.');
    return await this.baiBaoModel.destroy({
      where: { id },
      cascade: true,
    });
  }

  async search(query: SearchDto) {
    const keywords = query.key.split(' ');
    const where = keywords.map((keyword) => ({
      [Op.or]: [
        { ten_bai_bao: { [Op.iLike]: `%${keyword}%` } },
        { ten_tap_chi: { [Op.iLike]: `%${keyword}%` } },
        { chi_so_ISSN: { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('danh_muc_xep_hang'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        sequelizeWhere(cast(col('he_so_anh_huong_IF'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        sequelizeWhere(cast(col('muc_xep_hang'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        sequelizeWhere(cast(col('thoi_gian_dang_bai'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        { linh_vuc: { [Op.iLike]: `%${keyword}%` } },
        { '$nhiem_vu_khcn.ten$': { [Op.iLike]: `%${keyword}%` } },
      ],
    }));
    return await this.baiBaoModel.findAll({
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
