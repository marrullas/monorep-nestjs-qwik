import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsString,  } from "class-validator";
import { IsEmailAlreadyExist } from "../validations/IsEmailAlreadyExistConstrain";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The username of the User',
    example: 'johndoe',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsEmailAlreadyExist()
  @ApiProperty({
    description: 'The email of the User',
    example: 'correo@correo.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The password of the User',
    example: '123456',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The contact_info of the User',
    example: 'telefono: 1234567890, direccion: calle 123',
  })
  contact_info: string;

  @IsString()
  @ApiProperty({
    description: 'The identification of the User',
    example: '1234567890',
  })
  identification: string;

  // @IsString()
  // role: string;

  @IsString()
  @ApiProperty({
    description: 'The bio of the User',
    example: 'I am a developer',
  })
  bio: string;

  // @IsArray()
  // groups: string[];

  // @IsString()
  // company: string;
}
