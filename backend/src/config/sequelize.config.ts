import { DonVi, NhiemVuBVMT, TacGia } from '@/models';
import { BaiBao } from '@/models/bai_bao.model';
import { TacGia_NhiemVu } from '@/models/chiu_trach_nhiem.model';
import { ChuyenGiao } from '@/models/chuyen_giao.model';
import { GiaiThuong } from '@/models/giai_thuong.model';
import { NghiemThu } from '@/models/nghiem_thu.model';
import { TacGia_GiaiThuong } from '@/models/khen_thuong.model';
import { KinhPhi } from '@/models/kinh_phi.model';
import { NhiemVuKHCN } from '@/models/nhiem_vu_khcn.model';
import { Sach } from '@/models/sach.model';
import { TaiKhoan } from '@/models/tai_khoan.model';
import { TaiSan } from '@/models/tai_san.model';
import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

export const sequelizeConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => ({
  dialect: configService.get<Dialect>('DB_DIALECT') ?? 'postgres',
  database: configService.get<string>('DB_NAME'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT') ?? 5432,
  synchronize: true,
  autoLoadModels: true,
  models: [
    BaiBao,
    TacGia_NhiemVu,
    ChuyenGiao,
    DonVi,
    GiaiThuong,
    NghiemThu,
    TacGia_GiaiThuong,
    KinhPhi,
    NhiemVuBVMT,
    NhiemVuKHCN,
    Sach,
    TacGia,
    TaiKhoan,
    TaiSan,
  ],
});
