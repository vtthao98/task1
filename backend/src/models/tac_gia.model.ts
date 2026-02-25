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
import { NhiemVuBVMT } from './nhiem_vu_bvmt.model';
import { TacGia_NhiemVu } from './chiu_trach_nhiem.model';
import { TacGia_GiaiThuong } from './khen_thuong.model';

export enum GioiTinh {
  NAM = 'Nam',
  NU = 'Nữ',
  KHAC = 'Khác',
}

@Table({
  tableName: 'TacGia',
  freezeTableName: true,
})
export class TacGia extends Model<TacGia> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  ten: string;

  @Column({
    type: DataType.ENUM(...Object.values(GioiTinh)),
  })
  gioi_tinh: GioiTinh;

  @ForeignKey(() => DonVi)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  don_vi_id: number;

  @BelongsTo(() => DonVi)
  don_vi: DonVi;

  @Column({
    allowNull: false,
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  thuoc_dhdn: boolean;

  @Column({
    type: DataType.STRING,
  })
  trinh_do: string;

  @HasMany(() => NhiemVuBVMT)
  nhiem_vu_bvmt: NhiemVuBVMT;

  @HasMany(() => TacGia_NhiemVu)
  chiu_trach_nhiem: TacGia_NhiemVu;

  @HasMany(() => TacGia_GiaiThuong)
  khen_thuong: TacGia_GiaiThuong;
}
