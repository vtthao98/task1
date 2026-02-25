import { PartialType } from '@nestjs/mapped-types';
import { CreateNghiemThuDto } from './create-nghiem_thu.dto';

export class UpdateNghiemThuDto extends PartialType(CreateNghiemThuDto) {}
