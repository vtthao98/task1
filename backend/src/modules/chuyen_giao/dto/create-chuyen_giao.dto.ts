import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { NhiemVuKHCN, TinhTrang } from '@/models';
import { IsExist } from '@/common/validators/foreign_key.decorator';
import { Type } from 'class-transformer';

export class CreateChuyenGiaoDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsExist(NhiemVuKHCN, { message: 'Nhiệm vụ không tồn tại' })
  ma_nhiem_vu: number;

  @IsOptional()
  @IsString()
  dia_chi: string;

  @IsEnum(TinhTrang)
  @IsOptional()
  tinh_trang: TinhTrang;
}
