import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { NhiemVuKHCN, CapNghiemThu } from '@/models';
import { IsExist } from '@/common/validators/foreign_key.decorator';
import { Type } from 'class-transformer';

export class CreateNghiemThuDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsExist(NhiemVuKHCN, { message: 'Nhiệm vụ không tồn tại' })
  ma_nhiem_vu: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  thoi_gian: Date;

  @IsOptional()
  @IsString()
  xep_loai: string;

  @IsEnum(CapNghiemThu)
  @IsOptional()
  cap_nghiem_thu: CapNghiemThu;
}
