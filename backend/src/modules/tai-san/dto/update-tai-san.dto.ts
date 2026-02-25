import { PartialType } from '@nestjs/mapped-types';
import { CreateTaiSanDto } from './create-tai-san.dto';

export class UpdateTaiSanDto extends PartialType(CreateTaiSanDto) {}                    