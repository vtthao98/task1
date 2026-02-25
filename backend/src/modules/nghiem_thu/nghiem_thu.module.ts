import { Module } from '@nestjs/common';
import { NghiemThuService } from './nghiem_thu.service';
import { NghiemThuController } from './nghiem_thu.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NhiemVuKHCN, NghiemThu } from '@/models';
import { IsExistConstraint } from '@/common/validators/foreign_key.validator';

@Module({
  controllers: [NghiemThuController],
  providers: [NghiemThuService, IsExistConstraint],
  imports: [SequelizeModule.forFeature([NhiemVuKHCN, NghiemThu])],
})
export class NghiemThuModule {}
