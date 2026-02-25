import { DonVi, TacGia } from '@/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTacGiaDto } from './dto/create-tac-gia.dto';
import { UpdateTacGiaDto } from './dto/update-tac_gia.dto';
import { Op, col, where as sequelizeWhere, cast } from 'sequelize';
import { SearchDto } from '@/common/dto/search.dto';

@Injectable()
export class TacGiaService {
  constructor(
    @InjectModel(TacGia) private readonly tacGiaModel: typeof TacGia,
  ) {}

  async create(createTacGiaDto: CreateTacGiaDto) {
    await this.tacGiaModel.create(createTacGiaDto as any);
    return;
  }

  async findAll() {
    return await this.tacGiaModel.findAll({
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
    return await this.tacGiaModel.findOne({
      include: [
        {
          model: DonVi,
          as: 'don_vi',
          attributes: ['ten'],
        },
      ],
      where: {
        id,
        is_active: true,
      },
      attributes: {
        exclude: ['is_active', 'createdAt', 'updatedAt'],
      },
    });
  }

  async update(updateTacGiaDto: UpdateTacGiaDto, id: number) {
    const alreadyExist = await this.tacGiaModel.findByPk(id);
    if (!alreadyExist) throw new BadRequestException('Không tìm thấy tác giả.');

    const updated = await alreadyExist.update(updateTacGiaDto);
    return updated;
  }

  async delete(id: number) {
    const alreadyExist = await this.tacGiaModel.findByPk(id);
    if (!alreadyExist) throw new BadRequestException('Không tìm thấy tác giả.');
    return await alreadyExist.update({ is_active: false });
  }

  async search(query: SearchDto) {
    const keywords = query.key.split(' ');
    const where = keywords.map((keyword) => ({
      [Op.or]: [
        { ten: { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('gioi_tinh'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        { '$don_vi.ten$': { [Op.iLike]: `%${keyword}%` } },
        sequelizeWhere(cast(col('thuoc_dhdn'), 'TEXT'), {
          [Op.iLike]: `%${keyword}%`,
        }),
        { trinh_do: { [Op.iLike]: `%${keyword}%` } },
      ],
    }));
    return await this.tacGiaModel.findAll({
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
