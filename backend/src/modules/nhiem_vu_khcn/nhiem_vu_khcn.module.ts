import { Module } from '@nestjs/common';
import { NhiemVuKHCNService } from './nhiem_vu_khcn.service';
import { NhiemVuKHCNController } from './nhiem_vu_khcn.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NhiemVuKHCN, DonVi } from '@/models';
import { IsExistConstraint } from '@/common/validators/foreign_key.validator';

@Module({
  controllers: [NhiemVuKHCNController],
  providers: [NhiemVuKHCNService, IsExistConstraint],
  imports: [SequelizeModule.forFeature([NhiemVuKHCN, DonVi])],
})
export class NhiemVuKHCNModule {}
