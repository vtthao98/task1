import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { TacGia } from './tac_gia.model';

export enum LoaiNhiemVu {
  CM = 'Chuyên môn',
  TH = 'Tập huấn',
  TT = 'Tuyên truyền',
}

@Table({
  tableName: 'NhiemVuBVMT',
  freezeTableName: true,
})
export class NhiemVuBVMT extends Model<NhiemVuBVMT> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  ten: string;

  @Column({
    type: DataType.ENUM(...Object.values(LoaiNhiemVu)),
  })
  loai: LoaiNhiemVu;

  @ForeignKey(() => TacGia)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  chu_nhiem: number;

  @Column({
    type: DataType.DATE,
  })
  thoi_gian: Date;

  @Column({
    type: DataType.TEXT,
  })
  noi_dung: string;

  @Column({
    type: DataType.STRING,
  })
  ket_qua_san_pham: string;

  @Column({
    type: DataType.INTEGER,
  })
  kinh_phi: number;

  @BelongsTo(() => TacGia)
  tac_gia: TacGia;
}
