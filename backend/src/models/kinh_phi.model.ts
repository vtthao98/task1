import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { NhiemVuKHCN } from './nhiem_vu_khcn.model';

@Table({
  tableName: 'KinhPhi',
  freezeTableName: true,
})
export class KinhPhi extends Model<KinhPhi> {
  @ForeignKey(() => NhiemVuKHCN)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  ma_nhiem_vu: number;

  @BelongsTo(() => NhiemVuKHCN)
  nhiem_vu_khcn: NhiemVuKHCN;

  @Column({
    type: DataType.STRING,
  })
  nguon_kinh_phi: string;

  @Column({
    type: DataType.INTEGER,
  })
  so_tien_kinh_phi: number;

  @Column({
    type: DataType.INTEGER,
  })
  so_tien_thanh_toan: number;
}
