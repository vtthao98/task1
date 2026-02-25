import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDonViDto {
  @IsString({ message: 'Tên phải là chuỗi' })
  @IsNotEmpty({ message: 'Không được bỏ trống trường "ten"' })
  ten: string;
}
