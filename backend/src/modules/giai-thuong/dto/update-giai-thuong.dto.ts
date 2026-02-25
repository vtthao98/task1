import { PartialType } from '@nestjs/mapped-types';
import { CreateGiaiThuongDto } from './create-giai-thuong.dto';

export class UpdateGiaiThuongDto extends PartialType(CreateGiaiThuongDto) {}