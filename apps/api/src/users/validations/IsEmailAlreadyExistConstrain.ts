import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { AnyObject } from 'mongoose';
import { UsersService } from '../users.service';


@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
  //constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  constructor(private userService: UsersService) {}

  async validate(email: string): Promise<boolean> {
    //const user = await this.userModel.findOne({ email });
    const user = await this.userService.findByField('email', email);
    console.log('user', Boolean(user));
    //return !user;
    return Boolean(!user);
  }

  defaultMessage(): string {
    return 'Email $value already exists. Choose another email.';
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: AnyObject, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    });
  };
}
