import { GiaiThuong } from '@/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGiaiThuongDto } from './dto/create-giai-thuong.dto';
import { UpdateGiaiThuongDto } from './dto/update-giai-thuong.dto';
import { SearchDto } from '@/common/dto/search.dto';
import { cast, col, Op, where as sequelizeWhere } from 'sequelize';

@Injectable()
export class GiaiThuongService {
  constructor(
    @InjectModel(GiaiThuong)
    private model: typeof GiaiThuong,
  ) {}

  async findAll() {
    return this.model.findAll({
      where: {
        is_active: true,
      },
      attributes: {
        exclude: ['is_active', 'createdAt', 'updatedAt'],
      },
    });
  }

  async findOne(id: number) {
    return await this.model.findOne({
      where: {
        id,
        is_active: true,
      },
      attributes: {
        exclude: ['is_active', 'createdAt', 'updatedAt'],
      },
    });
  }

  async create(data: CreateGiaiThuongDto) {
    return await this.model.create(data as any);
  }

  async update(id: number, data: UpdateGiaiThuongDto) {
    const alreadyExist = await this.model.findByPk(id);
    if (!alreadyExist)
      throw new BadRequestException('Không tìm thấy nhiệm vụ.');

    const updated = await alreadyExist.update(data);
    return updated;
  }

  async delete(id: number) {
    const alreadyExist = await this.model.findByPk(id);
    if (!alreadyExist)
      throw new BadRequestException('Không tìm thấy giải thưởng.');
    const updated = await alreadyExist.update({ is_active: false });
    return;
  }

  async search(query: SearchDto) {
    const keywords = query.key.split(' ');
    const where = keywords.map((keyword) => ({
      [Op.or]: [
        { ten: { [Op.iLike]: `%${keyword}%` } },
        { linh_vuc: { [Op.iLike]: `%${keyword}%` } },
        { cap_khen_thuong: { [Op.iLike]: `%${keyword}%` } },
        { xep_hang: { [Op.iLike]: `%${keyword}%` } },
        { gia_trị_giai_thuong: { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('nam_khen_thuong'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
      ],
    }));
    return await this.model.findAll({
      where: {
        [Op.and]: where,
        is_active: true,
      },
      attributes: {
        exclude: ['is_active', 'createdAt', 'updatedAt'],
      },
    });
  }
}
