import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum Role {
  ADMIN = 'Admin',
  USER = 'User',
}

@Table({
  tableName: 'TaiKhoan',
  freezeTableName: true,
})
export class TaiKhoan extends Model<TaiKhoan> {
  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  ten_dang_nhap: string;

  @Column({
    type: DataType.STRING,
  })
  mat_khau: string;

  @Column({
    type: DataType.ENUM(...Object.values(Role)),
  })
  role: Role;
}
