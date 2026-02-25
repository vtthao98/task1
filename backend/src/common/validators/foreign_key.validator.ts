import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsExistConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [model] = args.constraints;

    if (!value) return false;

    const record = await model.findByPk(value);
    return !!record;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} không tồn tại`;
  }
}
