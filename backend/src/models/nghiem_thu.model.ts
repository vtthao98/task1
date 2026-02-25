import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { NhiemVuKHCN } from './nhiem_vu_khcn.model';

export enum CapNghiemThu {
  COSO = 'Cấp cơ sở',
  CT = 'Chính thức',
}

@Table({
  tableName: 'NghiemThu',
  freezeTableName: true,
})
export class NghiemThu extends Model<NghiemThu> {
  @ForeignKey(() => NhiemVuKHCN)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  ma_nhiem_vu: number;

  @BelongsTo(() => NhiemVuKHCN)
  nhiem_vu_khcn: NhiemVuKHCN;

  @Column({
    type: DataType.DATE,
  })
  thoi_gian: Date;

  @Column({
    type: DataType.STRING,
  })
  xep_loai: string;

  @Column({
    type: DataType.ENUM(...Object.values(CapNghiemThu)),
  })
  cap_nghiem_thu: CapNghiemThu;
}
