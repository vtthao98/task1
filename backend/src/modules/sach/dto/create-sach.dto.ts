import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { NhiemVuKHCN, LoaiSach } from '@/models';
import { IsExist } from '@/common/validators/foreign_key.decorator';
import { Type } from 'class-transformer';

export class CreateSachDto {
  @IsString({ message: 'Tên phải là chuỗi' })
  @IsNotEmpty({ message: 'Không được bỏ trống trường "ten"' })
  ten: string;

  @IsEnum(LoaiSach)
  @IsOptional()
  loai_sach: LoaiSach;

  @IsOptional()
  @IsString()
  chi_so_ISBN: string;

  @IsOptional()
  @IsString()
  nha_xuat_ban: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  thoi_gian_xuat_ban: Date;

  @IsOptional()
  @IsString()
  linh_vuc: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsExist(NhiemVuKHCN, { message: 'Nhiệm vụ không tồn tại' })
  xuat_xu: number;
}
