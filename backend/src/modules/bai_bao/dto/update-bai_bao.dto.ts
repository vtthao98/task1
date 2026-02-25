import { PartialType } from '@nestjs/mapped-types';
import { CreateBaiBaoDto } from './create-bai_bao.dto';

export class UpdateBaiBaoDto extends PartialType(CreateBaiBaoDto) {}
