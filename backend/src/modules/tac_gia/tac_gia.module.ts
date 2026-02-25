import { Module } from '@nestjs/common';
import { TacGiaService } from './tac_gia.service';
import { TacGiaController } from './tac_gia.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DonVi, TacGia } from '@/models';
import { IsExistConstraint } from '@/common/validators/foreign_key.validator';

@Module({
  controllers: [TacGiaController],
  providers: [TacGiaService, IsExistConstraint],
  imports: [SequelizeModule.forFeature([TacGia, DonVi])],
})
export class TacGiaModule {}
