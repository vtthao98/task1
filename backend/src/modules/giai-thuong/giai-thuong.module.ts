import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GiaiThuongController } from './giai-thuong.controller';
import { GiaiThuongService } from './giai-thuong.service';
import { IsExistConstraint } from '@/common/validators/foreign_key.validator';
import { GiaiThuong } from '@/models';

@Module({
  imports: [SequelizeModule.forFeature([GiaiThuong])],
  controllers: [GiaiThuongController],
  providers: [GiaiThuongService, IsExistConstraint],
})
export class GiaiThuongModule {}
