import { Module } from '@nestjs/common';
import { DonViService } from './don_vi.service';
import { DonViController } from './don_vi.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DonVi } from '@/models';

@Module({
  controllers: [DonViController],
  providers: [DonViService],
  imports: [SequelizeModule.forFeature([DonVi])],
})
export class DonViModule {}
