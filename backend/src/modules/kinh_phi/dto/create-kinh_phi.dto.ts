import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { NhiemVuKHCN } from '@/models';
import { IsExist } from '@/common/validators/foreign_key.decorator';
import { Type } from 'class-transformer';

export class CreateKinhPhiDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsExist(NhiemVuKHCN, { message: 'Nhiệm vụ không tồn tại' })
  ma_nhiem_vu: number;

  @IsOptional()
  @IsString()
  nguon_kinh_phi: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  so_tien_kinh_phi: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  so_tien_thanh_toan: number;
}
