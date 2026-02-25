import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { TacGia } from './tac_gia.model';
import { NhiemVuKHCN } from './nhiem_vu_khcn.model';

@Table({
  tableName: 'TacGia_NhiemVu',
  freezeTableName: true,
})
export class TacGia_NhiemVu extends Model<TacGia_NhiemVu> {
  @ForeignKey(() => NhiemVuKHCN)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  ma_nhiem_vu: number;

  @BelongsTo(() => NhiemVuKHCN)
  nhiem_vu: NhiemVuKHCN;

  @ForeignKey(() => TacGia)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  ma_tac_gia: number;

  @BelongsTo(() => TacGia)
  tac_gia: TacGia;

  @Column({
    type: DataType.STRING,
  })
  trach_nhiem: string;
}
