import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { DonVi } from './don_vi.model';
import { TacGia_NhiemVu } from './chiu_trach_nhiem.model';
import { NghiemThu } from './nghiem_thu.model';
import { ChuyenGiao } from './chuyen_giao.model';
import { KinhPhi } from './kinh_phi.model';
import { BaiBao } from './bai_bao.model';
import { TaiSan } from './tai_san.model';
import { Sach } from './sach.model';

export enum LoaiNhiemVuKHCN {
  NH = 'Độc lập cấp NH',
  NAFOSTED = 'Độc lập cấp Nafosted',
  BO = 'Độc lập cấp Bộ',
  DHDN = 'Độc lập cấp ĐHĐN',
  DP = 'Độc lập cấp địa phương',
  CS = 'Độc lập cấp cơ sở',
  KHAC = 'Đề tài khác',
}

@Table({
  tableName: 'NhiemVuKHCN',
  freezeTableName: true,
})
export class NhiemVuKHCN extends Model<NhiemVuKHCN> {
  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  ten: string;

  @Column({
    type: DataType.ENUM(...Object.values(LoaiNhiemVuKHCN)),
  })
  loai: LoaiNhiemVuKHCN;

  @Column({
    type: DataType.STRING,
  })
  linh_vuc: string;

  @ForeignKey(() => DonVi)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  don_vi_chu_tri: number;

  @BelongsTo(() => DonVi)
  don_vi: DonVi;

  @Column({
    type: DataType.DATE,
  })
  thoi_gian_bat_dau: Date;

  @Column({
    type: DataType.DATE,
  })
  thoi_gian_ket_thuc: Date;

  @Column({
    type: DataType.INTEGER,
  })
  tong_kinh_phi: number;

  @Column({
    type: DataType.STRING,
  })
  ten_san_pham_ung_dung: string;

  @Column({
    type: DataType.DATE,
  })
  thoi_gian_thanh_ly: Date;

  @Column({
    type: DataType.STRING,
  })
  ly_do_thanh_ly: string;

  @Column({
    type: DataType.INTEGER,
  })
  ngan_sach: number;

  @Column({
    type: DataType.INTEGER,
  })
  quy_PTKHCN_DHDN: number;

  @Column({
    type: DataType.INTEGER,
  })
  dia_phuong: number;

  @Column({
    type: DataType.INTEGER,
  })
  don_vi_ngoai: number;

  @Column({
    type: DataType.INTEGER,
  })
  chua_quyet_toan: number;

  @Column({
    type: DataType.STRING,
  })
  muc_tieu: string;

  @Column({
    type: DataType.STRING,
  })
  tinh_moi_sang_tao: string;

  @Column({
    type: DataType.STRING,
  })
  ket_qua_nghien_cuu: string;

  @Column({
    type: DataType.STRING,
  })
  gia_tri_KH_TT: string;

  @Column({
    type: DataType.STRING,
  })
  ghi_chu: string;

  @Column({
    allowNull: false,
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  is_active: boolean;

  //Relation
  @HasMany(() => TacGia_NhiemVu)
  nhiem_vu_bvmt: TacGia_NhiemVu;

  @HasMany(() => NghiemThu)
  nghiem_thu: NghiemThu;

  @HasMany(() => ChuyenGiao)
  chuyen_gia: ChuyenGiao;

  @HasMany(() => KinhPhi)
  kinh_phi: KinhPhi;

  @HasMany(() => BaiBao)
  bai_bao: BaiBao;

  @HasMany(() => TaiSan)
  tai_san: TaiSan;

  @HasMany(() => Sach)
  sach: Sach;
}
