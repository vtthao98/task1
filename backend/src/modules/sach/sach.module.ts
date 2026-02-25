import { Module } from '@nestjs/common';
import { SachService } from './sach.service';
import { SachController } from './sach.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NhiemVuKHCN, Sach } from '@/models';
import { IsExistConstraint } from '@/common/validators/foreign_key.validator';

@Module({
  controllers: [SachController],
  providers: [SachService, IsExistConstraint],
  imports: [SequelizeModule.forFeature([NhiemVuKHCN, Sach])],
})
export class SachModule {}
