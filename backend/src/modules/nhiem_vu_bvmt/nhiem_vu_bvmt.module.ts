import { Module } from '@nestjs/common';
import { NhiemVuBVMTService } from './nhiem_vu_bvmt.service';
import { NhiemVuBVMTController } from './nhiem_vu_bvmt.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NhiemVuBVMT, TacGia } from '@/models';
import { IsExistConstraint } from '@/common/validators/foreign_key.validator';

@Module({
  controllers: [NhiemVuBVMTController],
  providers: [NhiemVuBVMTService, IsExistConstraint],
  imports: [SequelizeModule.forFeature([NhiemVuBVMT, TacGia])],
})
export class NhiemVuBVMTModule {}
