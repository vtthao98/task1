import { PartialType } from '@nestjs/mapped-types';
import { CreateNhiemVuBVMTDto } from './create-nhiem_vu_bvmt.dto';

export class UpdateNhiemVuBVMTDto extends PartialType(CreateNhiemVuBVMTDto) {}
