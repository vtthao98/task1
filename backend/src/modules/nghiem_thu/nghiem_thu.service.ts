import { NhiemVuKHCN, NghiemThu } from '@/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNghiemThuDto } from './dto/create-nghiem_thu.dto';
import { UpdateNghiemThuDto } from './dto/update-nghiem_thu.dto';
import { Op, col, where as sequelizeWhere, cast } from 'sequelize';
import { SearchDto } from '@/common/dto/search.dto';

@Injectable()
export class NghiemThuService {
  constructor(
    @InjectModel(NghiemThu)
    private readonly nghiemThuModel: typeof NghiemThu,
  ) {}

  async create(createNghiemThuDto: CreateNghiemThuDto) {
    await this.nghiemThuModel.create(createNghiemThuDto as any);
    return;
  }

  async findAll() {
    return await this.nghiemThuModel.findAll({
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
    return await this.nghiemThuModel.findOne({
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

  async update(updateNhiemVuDto: UpdateNghiemThuDto, id: number) {
    const alreadyExist = await this.nghiemThuModel.findByPk(id);
    if (!alreadyExist)
      throw new BadRequestException('Không tìm thấy kết quả nghiệm thu.');

    const updated = await alreadyExist.update(updateNhiemVuDto);
    return updated;
  }

  async delete(id: number) {
    const alreadyExist = await this.nghiemThuModel.findByPk(id);
    if (!alreadyExist)
      throw new BadRequestException('Không tìm thấy kết quả nghiệm thu.');
    return await this.nghiemThuModel.destroy({
      where: { id },
      cascade: true,
    });
  }

  async search(query: SearchDto) {
    const keywords = query.key.split(' ');
    const where = keywords.map((keyword) => ({
      [Op.or]: [
        { '$nhiem_vu_khcn.ten$': { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('thoi_gian'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        { xep_loai: { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('cap_nghiem_thu'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
      ],
    }));
    return await this.nghiemThuModel.findAll({
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
