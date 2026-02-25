import { PartialType } from '@nestjs/mapped-types';
import { CreateKinhPhiDto } from './create-kinh_phi.dto';

export class UpdateKinhPhiDto extends PartialType(CreateKinhPhiDto) {}
