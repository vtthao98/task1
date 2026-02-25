import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { NhiemVuKHCN } from './nhiem_vu_khcn.model';

export enum LoaiSach {
  CK = 'Chuyên khảo',
  GT = 'Giáo trình',
  TK = 'Tham khảo',
  KHAC = 'Khác',
}

@Table({
  tableName: 'Sach',
  freezeTableName: true,
})
export class Sach extends Model<Sach> {
  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  ten: string;

  @Column({
    type: DataType.ENUM(...Object.values(LoaiSach)),
  })
  loai_sach: LoaiSach;

  @Column({
    type: DataType.STRING,
  })
  chi_so_ISBN: string;

  @Column({
    type: DataType.STRING,
  })
  nha_xuat_ban: string;

  @Column({
    type: DataType.DATE,
  })
  thoi_gian_xuat_ban: Date;

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
