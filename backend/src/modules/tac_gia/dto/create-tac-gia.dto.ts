import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { DonVi, GioiTinh } from '@/models';
import { IsExist } from '@/common/validators/foreign_key.decorator';
import { Type } from 'class-transformer';

export class CreateTacGiaDto {
  @IsString({ message: 'Tên phải là chuỗi' })
  @IsNotEmpty({ message: 'Không được bỏ trống trường "ten"' })
  ten: string;

  @IsOptional()
  @IsEnum(GioiTinh)
  gioi_tinh: GioiTinh;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsExist(DonVi, { message: 'Đơn vị không tồn tại' })
  don_vi_id: number;

  @IsOptional()
  @IsBoolean()
  thuoc_dhdn: boolean;

  @IsOptional()
  @IsString()
  trinh_do: string;
}
