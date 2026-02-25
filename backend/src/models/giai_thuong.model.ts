import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { TacGia_GiaiThuong } from './khen_thuong.model';

@Table({
  tableName: 'GiaiThuong',
  freezeTableName: true,
})
export class GiaiThuong extends Model<GiaiThuong> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  ten: string;

  @Column({
    type: DataType.STRING,
  })
  linh_vuc: string;

  @Column({
    type: DataType.STRING,
  })
  cap_khen_thuong: string;

  @Column({
    type: DataType.STRING,
  })
  xep_hang: string;

  @Column({
    type: DataType.STRING,
  })
  gia_tri_giai_thuong: string;

  @Column({
    type: DataType.INTEGER,
  })
  nam_khen_thuong: number;

  @Column({
    allowNull: false,
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  is_active: boolean;

  // Relation
  @HasMany(() => TacGia_GiaiThuong)
  khen_thuong: TacGia_GiaiThuong;
}
