import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { NhiemVuKHCN } from './nhiem_vu_khcn.model';

export enum TinhTrang {
  DA = 'Đã CG',
  SE = 'Sẽ CG',
}

@Table({
  tableName: 'ChuyenGiao',
  freezeTableName: true,
})
export class ChuyenGiao extends Model<ChuyenGiao> {
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
  dia_chi: string;

  @Column({
    type: DataType.ENUM(...Object.values(TinhTrang)),
  })
  tinh_trang: TinhTrang;
}
