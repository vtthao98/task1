import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { sequelizeConfig } from './config/sequelize.config';
import { DonViModule } from './modules/don_vi/don_vi.module';
import { TacGiaModule } from './modules/tac_gia/tac_gia.module';
import { NhiemVuBVMTModule } from './modules/nhiem_vu_bvmt/nhiem_vu_bvmt.module';
import { NhiemVuKHCNModule } from './modules/nhiem_vu_khcn/nhiem_vu_khcn.module';
import { BaiBaoModule } from './modules/bai_bao/bai_bao.module';
import { SachModule } from './modules/sach/sach.module';
import { NghiemThuModule } from './modules/nghiem_thu/nghiem_thu.module';
import { ChuyenGiaoModule } from './modules/chuyen_giao/chuyen_giao.module';
import { KinhPhiModule } from './modules/kinh_phi/kinh_phi.module';
import { GiaiThuongModule } from './modules/giai-thuong/giai-thuong.module';
import { TaiSanModule } from './modules/tai-san/tai-san.module';
// import { TaiSanModule } from './modules/modules/tai-san/tai-san.module';
// import { GiaiThuongModule } from './modules/modules/giai-thuong/giai-thuong.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SequelizeModuleOptions =>
        sequelizeConfig(configService),
    }),
    DonViModule,
    TacGiaModule,
    NhiemVuBVMTModule,
    NhiemVuKHCNModule,
    BaiBaoModule,
    SachModule,
    NghiemThuModule,
    ChuyenGiaoModule,
    KinhPhiModule,
    GiaiThuongModule,
    TaiSanModule,
  ],
})
export class AppModule {}
