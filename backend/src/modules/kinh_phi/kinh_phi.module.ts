import { Module } from '@nestjs/common';
import { KinhPhiService } from './kinh_phi.service';
import { KinhPhiController } from './kinh_phi.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NhiemVuKHCN, KinhPhi } from '@/models';
import { IsExistConstraint } from '@/common/validators/foreign_key.validator';

@Module({
  controllers: [KinhPhiController],
  providers: [KinhPhiService, IsExistConstraint],
  imports: [SequelizeModule.forFeature([NhiemVuKHCN, KinhPhi])],
})
export class KinhPhiModule {}
