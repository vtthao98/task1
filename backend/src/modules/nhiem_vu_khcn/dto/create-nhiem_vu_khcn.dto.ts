import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { DonVi, LoaiNhiemVuKHCN } from '@/models';
import { IsExist } from '@/common/validators/foreign_key.decorator';
import { Type } from 'class-transformer';

export class CreateNhiemVuKHCNDto {
  @IsString({ message: 'Tên phải là chuỗi' })
  @IsNotEmpty({ message: 'Không được bỏ trống trường "ten"' })
  ten: string;

  @IsEnum(LoaiNhiemVuKHCN)
  @IsOptional()
  loai: LoaiNhiemVuKHCN;

  @IsOptional()
  @IsString()
  linh_vuc: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsExist(DonVi, { message: 'Đơn vị không tồn tại' })
  don_vi_chu_tri: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  thoi_gian_bat_dau: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  thoi_gian_ket_thuc: Date;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  tong_kinh_phi: number;

  @IsOptional()
  @IsString()
  ten_san_pham_ung_dung: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  thoi_gian_thanh_ly: Date;

  @IsOptional()
  @IsString()
  ly_do_thanh_ly: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  ngan_sach: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  quy_PTKHCN_DHDN: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  dia_phuong: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  don_vi_ngoai: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  chua_quyet_toan: number;

  @IsOptional()
  @IsString()
  muc_tieu: string;

  @IsOptional()
  @IsString()
  tinh_moi_sang_tao: string;

  @IsOptional()
  @IsString()
  ket_qua_nghien_cuu: string;

  @IsOptional()
  @IsString()
  gia_tri_KH_TT: string;

  @IsOptional()
  @IsString()
  ghi_chu: string;
}
