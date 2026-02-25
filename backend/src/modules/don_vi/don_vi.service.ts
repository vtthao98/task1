import { DonVi } from '@/models';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDonViDto } from './dto/create-don_vi.dto';
import { UpdateDonViDto } from './dto/update-don_vi.dto';
import { Op } from 'sequelize';
import { SearchDto } from '@/common/dto/search.dto';

@Injectable()
export class DonViService {
  constructor(@InjectModel(DonVi) private readonly donViModel: typeof DonVi) {}

  async create(createDonViDto: CreateDonViDto) {
    await this.donViModel.create(createDonViDto as any);
    return;
  }

  async findAll() {
    return await this.donViModel.findAll({
      where: {
        is_active: true,
      },
      // attributes: ['id', 'ten'],
      attributes: {
        exclude: ['is_active', 'createdAt', 'updatedAt'],
      },
    });
  }

  async findOne(id: number) {
    return await this.donViModel.findByPk(id);
  }

  async update(updateDonViDto: UpdateDonViDto, id: number) {
    const alreadyExist = await this.donViModel.findByPk(id);
    if (!alreadyExist) throw new BadRequestException('Không tìm thấy đơn vị.');

    const updated = await alreadyExist.update(updateDonViDto);
    return updated;
  }

  async delete(id: number) {
    // return await this.donViModel.destroy({where: {id}, cascade: true});
    const alreadyExist = await this.donViModel.findByPk(id);
    if (!alreadyExist) throw new BadRequestException('Không tìm thấy đơn vị.');
    const updated = await alreadyExist.update({ is_active: false });
    return;
  }

  async search(query: SearchDto) {
    const keywords = query.key.split(' ');
    const where = keywords.map((keyword) => ({
      [Op.or]: [{ ten: { [Op.iLike]: `%${keyword}%` } }],
    }));
    return await this.donViModel.findAll({
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
