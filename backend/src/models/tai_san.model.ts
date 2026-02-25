import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { NhiemVuKHCN } from './nhiem_vu_khcn.model';
import { TacGia } from './tac_gia.model';

export enum LoaiCongTrinh {
  SC = 'Sáng chế',
  GM = 'Giống mới',
  VXM = 'Vắc xin và chế phẩm mới',
  BVM = 'Bản vẽ thiết kế mới',
}

@Table({
  tableName: 'TaiSan',
  freezeTableName: true,
})
export class TaiSan extends Model<TaiSan> {
  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  ten: string;

  @Column({
    type: DataType.ENUM(...Object.values(LoaiCongTrinh)),
  })
  loai_cong_trinh: LoaiCongTrinh;

  @Column({
    type: DataType.DATE,
  })
  ngay_nop_don: Date;

  @Column({
    type: DataType.DATE,
  })
  thoi_gian_chap_nhan_don: Date;

  @Column({
    type: DataType.STRING,
  })
  so_quyet_dinh: string;

  @Column({
    type: DataType.DATE,
  })
  ngay_cap_bang: Date;

  @Column({
    type: DataType.STRING,
  })
  noi_nop_don: string;

  @ForeignKey(() => TacGia)
  @Column({
    type: DataType.INTEGER,
  })
  chu_don: number;

  @BelongsTo(() => TacGia)
  tac_gia: TacGia;

  @ForeignKey(() => NhiemVuKHCN)
  @Column({
    type: DataType.INTEGER,
  })
  xuat_phat_tu: number;

  @BelongsTo(() => NhiemVuKHCN)
  nhiem_vu_khcn: NhiemVuKHCN;

  @Column({
    type: DataType.STRING,
  })
  gioi_thieu_tom_tat: string;
}
