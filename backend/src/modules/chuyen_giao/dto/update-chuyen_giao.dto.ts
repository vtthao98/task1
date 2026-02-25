import { PartialType } from '@nestjs/mapped-types';
import { CreateChuyenGiaoDto } from './create-chuyen_giao.dto';

export class UpdateChuyenGiaoDto extends PartialType(CreateChuyenGiaoDto) {}
