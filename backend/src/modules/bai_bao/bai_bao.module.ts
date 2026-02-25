import { Module } from '@nestjs/common';
import { BaiBaoService } from './bai_bao.service';
import { BaiBaoController } from './bai_bao.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NhiemVuKHCN, BaiBao } from '@/models';
import { IsExistConstraint } from '@/common/validators/foreign_key.validator';

@Module({
  controllers: [BaiBaoController],
  providers: [BaiBaoService, IsExistConstraint],
  imports: [SequelizeModule.forFeature([NhiemVuKHCN, BaiBao])],
})
export class BaiBaoModule {}
