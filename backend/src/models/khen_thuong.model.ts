import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { GiaiThuong } from './giai_thuong.model';
import { TacGia } from './tac_gia.model';

@Table({
  tableName: 'TacGia_GiaiThuong',
  freezeTableName: true,
})
export class TacGia_GiaiThuong extends Model<TacGia_GiaiThuong> {
  @ForeignKey(() => GiaiThuong)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  ma_giai_thuong: number;

  @BelongsTo(() => GiaiThuong)
  giai_thuong: GiaiThuong;

  @ForeignKey(() => TacGia)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  ma_tac_gia: number;

  @BelongsTo(() => TacGia)
  tac_gia: TacGia;

  @Column({
    type: DataType.DATE,
  })
  thoi_gian: Date;
}
