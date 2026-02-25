import { NhiemVuKHCN, Sach } from '@/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSachDto } from './dto/create-sach.dto';
import { UpdateSachDto } from './dto/update-sach.dto';
import { Op, col, where as sequelizeWhere, cast } from 'sequelize';
import { SearchDto } from '@/common/dto/search.dto';

@Injectable()
export class SachService {
  constructor(
    @InjectModel(Sach)
    private readonly sachModel: typeof Sach,
  ) {}

  async create(createSachDto: CreateSachDto) {
    await this.sachModel.create(createSachDto as any);
    return;
  }

  async findAll() {
    return await this.sachModel.findAll({
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
    return await this.sachModel.findOne({
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

  async update(updateNhiemVuDto: UpdateSachDto, id: number) {
    const alreadyExist = await this.sachModel.findByPk(id);
    if (!alreadyExist) throw new BadRequestException('Không tìm thấy bài báo.');

    const updated = await alreadyExist.update(updateNhiemVuDto);
    return updated;
  }

  async delete(id: number) {
    const alreadyExist = await this.sachModel.findByPk(id);
    if (!alreadyExist) throw new BadRequestException('Không tìm thấy bài báo.');
    return await this.sachModel.destroy({
      where: { id },
      cascade: true,
    });
  }

  async search(query: SearchDto) {
    const keywords = query.key.split(' ');
    const where = keywords.map((keyword) => ({
      [Op.or]: [
        { ten: { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('loai_sach'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        { chi_so_ISBN: { [Op.iLike]: `%${keyword}%` } },
        { nha_xuat_ban: { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('thoi_gian_xuat_ban'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        { linh_vuc: { [Op.iLike]: `%${keyword}%` } },
        { '$nhiem_vu_khcn.ten$': { [Op.iLike]: `%${keyword}%` } },
      ],
    }));
    return await this.sachModel.findAll({
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
