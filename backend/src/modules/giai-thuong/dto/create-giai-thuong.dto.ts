import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateGiaiThuongDto {
  @IsString()
  ten: string;

  @IsOptional()
  @IsString()
  linh_vuc: string;

  @IsOptional()
  @IsString()
  cap_khen_thuong: string;

  @IsOptional()
  @IsString()
  xep_hang: string;

  @IsOptional()
  @IsString()
  gia_tri_giai_thuong: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  nam_khen_thuong: number;
}
