import { NhiemVuKHCN, DonVi } from '@/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNhiemVuKHCNDto } from './dto/create-nhiem_vu_khcn.dto';
import { UpdateNhiemVuKHCNDto } from './dto/update-nhiem_vu_khcn.dto';
import { Op, col, where as sequelizeWhere, cast } from 'sequelize';
import { SearchDto } from '@/common/dto/search.dto';

@Injectable()
export class NhiemVuKHCNService {
  constructor(
    @InjectModel(NhiemVuKHCN)
    private readonly nhiemVuKHCNModel: typeof NhiemVuKHCN,
  ) {}

  async create(createNhiemVuDto: CreateNhiemVuKHCNDto) {
    await this.nhiemVuKHCNModel.create(createNhiemVuDto as any);
    return;
  }

  async findAll() {
    return await this.nhiemVuKHCNModel.findAll({
      include: [
        {
          model: DonVi,
          as: 'don_vi',
          attributes: ['ten'],
        },
      ],
      where: {
        is_active: true,
      },
      attributes: {
        exclude: ['is_active', 'createdAt', 'updatedAt'],
      },
    });
  }

  async findOne(id: number) {
    return await this.nhiemVuKHCNModel.findOne({
      include: [
        {
          model: DonVi,
          as: 'don_vi',
          attributes: ['ten'],
        },
      ],
      where: {
        id,
      },
      attributes: {
        exclude: ['is_active', 'createdAt', 'updatedAt'],
      },
    });
  }

  async update(updateNhiemVuDto: UpdateNhiemVuKHCNDto, id: number) {
    const alreadyExist = await this.nhiemVuKHCNModel.findByPk(id);
    if (!alreadyExist)
      throw new BadRequestException('Không tìm thấy nhiệm vụ.');

    const updated = await alreadyExist.update(updateNhiemVuDto);
    return updated;
  }

  async delete(id: number) {
    const alreadyExist = await this.nhiemVuKHCNModel.findByPk(id);
    if (!alreadyExist)
      throw new BadRequestException('Không tìm thấy nhiệm vụ.');
    const updated = await alreadyExist.update({ is_active: false });
    return;
  }

  async search(query: SearchDto) {
    const keywords = query.key.split(' ');
    const where = keywords.map((keyword) => ({
      [Op.or]: [
        { ten: { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('loai'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        { linh_vuc: { [Op.iLike]: `%${keyword}%` } },
        { '$don_vi.ten$': { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('thoi_gian_bat_dau'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        sequelizeWhere(cast(col('thoi_gian_ket_thuc'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        sequelizeWhere(cast(col('tong_kinh_phi'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        { ten_san_pham_ung_dung: { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('thoi_gian_thanh_ly'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        { ly_do_thanh_ly: { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('ngan_sach'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        sequelizeWhere(cast(col('quy_PTKHCN_DHDN'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        sequelizeWhere(cast(col('dia_phuong'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        sequelizeWhere(cast(col('don_vi_ngoai'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        sequelizeWhere(cast(col('chua_quyet_toan'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        { muc_tieu: { [Op.iLike]: `%${keyword}%` } },
        { tinh_moi_sang_tao: { [Op.iLike]: `%${keyword}%` } },
        { ket_qua_nghien_cuu: { [Op.iLike]: `%${keyword}%` } },
        { gia_tri_KH_TT: { [Op.iLike]: `%${keyword}%` } },
        { ghi_chu: { [Op.iLike]: `%${keyword}%` } },
      ],
    }));
    return await this.nhiemVuKHCNModel.findAll({
      include: [
        {
          model: DonVi,
          as: 'don_vi',
          attributes: ['ten'],
        },
      ],
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
