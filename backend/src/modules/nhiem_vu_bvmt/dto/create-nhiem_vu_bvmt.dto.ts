import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TacGia, LoaiNhiemVu } from '@/models';
import { IsExist } from '@/common/validators/foreign_key.decorator';
import { Type } from 'class-transformer';

export class CreateNhiemVuBVMTDto {
  @IsString({ message: 'Tên phải là chuỗi' })
  @IsNotEmpty({ message: 'Không được bỏ trống trường "ten"' })
  ten: string;

  @IsEnum(LoaiNhiemVu)
  @IsOptional()
  loai: LoaiNhiemVu;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsExist(TacGia, { message: 'Tác giả không tồn tại' })
  chu_nhiem: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  thoi_gian: Date;

  @IsOptional()
  @IsString()
  noi_dung: string;

  @IsOptional()
  @IsString()
  ket_qua_san_pham: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  kinh_phi: number;
}
