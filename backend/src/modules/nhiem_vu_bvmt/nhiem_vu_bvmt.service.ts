import { NhiemVuBVMT, TacGia } from '@/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNhiemVuBVMTDto } from './dto/create-nhiem_vu_bvmt.dto';
import { UpdateNhiemVuBVMTDto } from './dto/update-nhiem_vu_bvmt.dto';
import { Op, col, where as sequelizeWhere, cast } from 'sequelize';
import { SearchDto } from '@/common/dto/search.dto';

@Injectable()
export class NhiemVuBVMTService {
  constructor(
    @InjectModel(NhiemVuBVMT)
    private readonly nhiemVuBVMTModel: typeof NhiemVuBVMT,
  ) {}

  async create(createNhiemVuDto: CreateNhiemVuBVMTDto) {
    await this.nhiemVuBVMTModel.create(createNhiemVuDto as any);
    return;
  }

  async findAll() {
    return await this.nhiemVuBVMTModel.findAll({
      include: [
        {
          model: TacGia,
          as: 'tac_gia',
          attributes: ['ten'],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  async findOne(id: number) {
    return await this.nhiemVuBVMTModel.findOne({
      include: [
        {
          model: TacGia,
          as: 'tac_gia',
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

  async update(updateNhiemVuDto: UpdateNhiemVuBVMTDto, id: number) {
    const alreadyExist = await this.nhiemVuBVMTModel.findByPk(id);
    if (!alreadyExist)
      throw new BadRequestException('Không tìm thấy nhiệm vụ.');

    const updated = await alreadyExist.update(updateNhiemVuDto);
    return updated;
  }

  async delete(id: number) {
    const alreadyExist = await this.nhiemVuBVMTModel.findByPk(id);
    if (!alreadyExist)
      throw new BadRequestException('Không tìm thấy nhiệm vụ.');
    return await this.nhiemVuBVMTModel.destroy({
      where: { id },
      cascade: true,
    });
  }

  async search(query: SearchDto) {
    const keywords = query.key.split(' ');
    const where = keywords.map((keyword) => ({
      [Op.or]: [
        { ten: { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('loai'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        { '$tac_gia.ten$': { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('thoi_gian'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        { noi_dung: { [Op.iLike]: `%${keyword}%` } },
        { ket_qua_san_pham: { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('kinh_phi'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
      ],
    }));
    return await this.nhiemVuBVMTModel.findAll({
      include: [
        {
          model: TacGia,
          as: 'tac_gia',
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
