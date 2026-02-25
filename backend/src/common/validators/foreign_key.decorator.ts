import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsExistConstraint } from './foreign_key.validator';

export function IsExist(model: any, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model],
      validator: IsExistConstraint,
    });
  };
}
