import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { TacGia } from './tac_gia.model';
import { NhiemVuKHCN } from './nhiem_vu_khcn.model';

@Table({
  tableName: 'DonVi',
  freezeTableName: true,
})
export class DonVi extends Model<DonVi> {
  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  ten: string;

  @Column({
    allowNull: false,
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  is_active: boolean;

  // Relations
  @HasMany(() => TacGia)
  tac_gia: TacGia;

  @HasMany(() => NhiemVuKHCN)
  nhiem_vu_KHCN: NhiemVuKHCN;
}
