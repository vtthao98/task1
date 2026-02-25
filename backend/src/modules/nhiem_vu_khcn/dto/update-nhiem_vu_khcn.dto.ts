import { PartialType } from '@nestjs/mapped-types';
import { CreateNhiemVuKHCNDto } from './create-nhiem_vu_khcn.dto';

export class UpdateNhiemVuKHCNDto extends PartialType(CreateNhiemVuKHCNDto) {}
