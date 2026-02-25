import { Module } from '@nestjs/common';
import { ChuyenGiaoService } from './chuyen_giao.service';
import { ChuyenGiaoController } from './chuyen_giao.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NhiemVuKHCN, ChuyenGiao } from '@/models';
import { IsExistConstraint } from '@/common/validators/foreign_key.validator';

@Module({
  controllers: [ChuyenGiaoController],
  providers: [ChuyenGiaoService, IsExistConstraint],
  imports: [SequelizeModule.forFeature([NhiemVuKHCN, ChuyenGiao])],
})
export class ChuyenGiaoModule {}
