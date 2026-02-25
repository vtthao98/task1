import { NhiemVuKHCN, TacGia, TaiSan } from '@/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaiSanDto } from './dto/create-tai-san.dto';
import { UpdateTaiSanDto } from './dto/update-tai-san.dto';
import { SearchDto } from '@/common/dto/search.dto';
import { cast, col, Op, where as sequelizeWhere } from 'sequelize';

@Injectable()
export class TaiSanService {
  constructor(
    @InjectModel(TaiSan)
    private model: typeof TaiSan,
  ) {}

  async findAll() {
    return await this.model.findAll({
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
    return await this.model.findOne({
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

  async create(createNhiemVuDto: CreateTaiSanDto) {
    await this.model.create(createNhiemVuDto as any);
    return;
  }

  async update(updateNhiemVuDto: UpdateTaiSanDto, id: number) {
    const alreadyExist = await this.model.findByPk(id);
    if (!alreadyExist)
      throw new BadRequestException('Không tìm thấy tài sản trí tuệ.');

    const updated = await alreadyExist.update(updateNhiemVuDto);
    return updated;
  }

  async delete(id: number) {
    const alreadyExist = await this.model.findByPk(id);
    if (!alreadyExist)
      throw new BadRequestException('Không tìm thấy tài sản trí tuệ.');
    return await this.model.destroy({
      where: { id },
      cascade: true,
    });
  }

  async search(query: SearchDto) {
    const keywords = query.key.split(' ');
    const where = keywords.map((keyword) => ({
      [Op.or]: [
        { ten: { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('loai_cong_trinh'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        { '$tac_gia.ten$': { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('ngay_nop_don'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        { '$nhiem_vu_khcn.ten$': { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('thoi_gian_chap_nhan_don'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        { so_quyet_dinh: { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('ngay_cap_bang'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        { noi_nop_don: { [Op.iLike]: `%${keyword}%` } },
        { gioi_thieu_tom_tat: { [Op.iLike]: `%${keyword}%` } },
      ],
    }));
    return await this.model.findAll({
      include: [
        {
          model: TacGia,
          as: 'tac_gia',
          attributes: ['ten'],
        },
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
