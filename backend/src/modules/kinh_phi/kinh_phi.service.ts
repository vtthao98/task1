import { NhiemVuKHCN, KinhPhi } from '@/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateKinhPhiDto } from './dto/create-kinh_phi.dto';
import { UpdateKinhPhiDto } from './dto/update-kinh_phi.dto';
import { Op, col, where as sequelizeWhere, cast } from 'sequelize';
import { SearchDto } from '@/common/dto/search.dto';

@Injectable()
export class KinhPhiService {
  constructor(
    @InjectModel(KinhPhi)
    private readonly kinhPhiModel: typeof KinhPhi,
  ) {}

  async create(createKinhPhiDto: CreateKinhPhiDto) {
    await this.kinhPhiModel.create(createKinhPhiDto as any);
    return;
  }

  async findAll() {
    return await this.kinhPhiModel.findAll({
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
    return await this.kinhPhiModel.findOne({
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

  async update(updateNhiemVuDto: UpdateKinhPhiDto, id: number) {
    const alreadyExist = await this.kinhPhiModel.findByPk(id);
    if (!alreadyExist)
      throw new BadRequestException('Không tìm thấy thông tin.');

    const updated = await alreadyExist.update(updateNhiemVuDto);
    return updated;
  }

  async delete(id: number) {
    const alreadyExist = await this.kinhPhiModel.findByPk(id);
    if (!alreadyExist)
      throw new BadRequestException('Không tìm thấy thông tin.');
    return await this.kinhPhiModel.destroy({
      where: { id },
      cascade: true,
    });
  }

  async search(query: SearchDto) {
    const keywords = query.key.split(' ');
    const where = keywords.map((keyword) => ({
      [Op.or]: [
        { '$nhiem_vu_khcn.ten$': { [Op.iLike]: `%${keyword}%` } },
        { nguon_kinh_phi: { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('so_tien_kinh_phi'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        sequelizeWhere(cast(col('so_tien_thanh_toan'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
      ],
    }));
    return await this.kinhPhiModel.findAll({
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
