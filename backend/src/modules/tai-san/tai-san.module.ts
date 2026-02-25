import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaiSanService } from './tai-san.service';
import { TaiSanController } from './tai-san.controller';
import { TaiSan, NhiemVuKHCN, TacGia } from '@/models';
import { IsExistConstraint } from '@/common/validators/foreign_key.validator';

@Module({
  imports: [SequelizeModule.forFeature([TaiSan, NhiemVuKHCN, TacGia])],
  providers: [TaiSanService, IsExistConstraint],
  controllers: [TaiSanController],
})
export class TaiSanModule {}
