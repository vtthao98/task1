import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { NhiemVuKHCN, DanhMucXepHang, MucXepHang } from '@/models';
import { IsExist } from '@/common/validators/foreign_key.decorator';
import { Type } from 'class-transformer';

export class CreateBaiBaoDto {
  @IsString({ message: 'Tên phải là chuỗi' })
  @IsNotEmpty({ message: 'Không được bỏ trống trường "ten"' })
  ten_bai_bao: string;

  @IsOptional()
  @IsString()
  ten_tap_chi: string;

  @IsOptional()
  @IsString()
  chi_so_ISSN: string;

  @IsEnum(DanhMucXepHang)
  @IsOptional()
  danh_muc_xep_hang: DanhMucXepHang;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  he_so_anh_huong_IF: number;

  @IsEnum(MucXepHang)
  @IsOptional()
  muc_xep_hang: MucXepHang;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  thoi_gian_dang_bai: Date;

  @IsOptional()
  @IsString()
  linh_vuc: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsExist(NhiemVuKHCN, { message: 'Nhiệm vụ không tồn tại' })
  xuat_xu: number;
}
