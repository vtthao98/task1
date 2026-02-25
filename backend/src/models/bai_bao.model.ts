import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { NhiemVuKHCN } from './nhiem_vu_khcn.model';

export enum DanhMucXepHang {
  WOS = 'Thuộc WOS',
  SCOPUS = 'Scopus',
  QTK = 'Bài báo quốc tế khác',
  TN = 'Bài báo trong nước',
  KY = 'Kỷ yếu hội nghị, hội thảo',
}

export enum MucXepHang {
  Q1 = 'Q1',
  Q2 = 'Q2',
  Q3 = 'Q3',
  Q4 = 'Q4',
}

@Table({
  tableName: 'BaiBao',
  freezeTableName: true,
})
export class BaiBao extends Model<BaiBao> {
  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  ten_bai_bao: string;

  @Column({
    type: DataType.STRING,
  })
  ten_tap_chi: string;

  @Column({
    type: DataType.STRING,
  })
  chi_so_ISSN: string;

  @Column({
    type: DataType.ENUM(...Object.values(DanhMucXepHang)),
  })
  danh_muc_xep_hang: DanhMucXepHang;

  @Column({
    type: DataType.INTEGER,
  })
  he_so_anh_huong_IF: number;

  @Column({
    type: DataType.ENUM(...Object.values(MucXepHang)),
  })
  muc_xep_hang: MucXepHang;

  @Column({
    type: DataType.DATE,
  })
  thoi_gian_dang_bai: Date;

  @Column({
    type: DataType.STRING,
  })
  linh_vuc: string;

  @ForeignKey(() => NhiemVuKHCN)
  @Column({
    type: DataType.INTEGER,
  })
  xuat_xu: number;

  @BelongsTo(() => NhiemVuKHCN)
  nhiem_vu_khcn: NhiemVuKHCN;
}
