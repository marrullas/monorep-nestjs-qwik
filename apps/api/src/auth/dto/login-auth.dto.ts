import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";


export class LoginAuthDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email of the User',
    example: 'johndoe@gmail.com',
  })
  email: string;

  @Length(6, 20)
  @ApiProperty({
    description: 'Password of the User',
    example: '123456',
  })
  password: string;
}


