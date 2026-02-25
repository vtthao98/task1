import { IsExist } from '@/common/validators/foreign_key.decorator';
import { NhiemVuKHCN, LoaiCongTrinh, TacGia } from '@/models';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsNotEmpty,
  IsDate,
  IsInt,
  IsEnum,
} from 'class-validator';

export class CreateTaiSanDto {
  @IsString()
  @IsNotEmpty()
  ten: string;

  @IsOptional()
  @IsEnum(LoaiCongTrinh)
  loai_cong_trinh?: LoaiCongTrinh;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  ngay_nop_don?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  thoi_gian_chap_nhan_don?: Date;

  @IsOptional()
  @IsString()
  so_quyet_dinh?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDateString()
  ngay_cap_bang?: Date;

  @IsOptional()
  @IsString()
  noi_nop_don?: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsExist(TacGia, { message: 'Tác giả không tồn tại' })
  chu_don: number;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsExist(NhiemVuKHCN, { message: 'Tác giả không tồn tại' })
  xuat_phat_tu: number;

  @IsOptional()
  @IsString()
  gioi_thieu_tom_tat?: string;
}
