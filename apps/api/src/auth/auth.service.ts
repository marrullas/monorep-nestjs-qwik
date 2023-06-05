import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from '../users/schemas/users.schema';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

//import { Auth, AuthDocument } from './schemas/auth.schema';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private readonly AuthModule: Model<UserDocument>,
    private jwtService: JwtService
    ) { }


  async login(LoginAuthDto: LoginAuthDto) {

    console.log("init login");
    const { email, password } = LoginAuthDto;
    const findUser = await this.AuthModule.findOne({ email });

    if (!findUser) throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);

    const isMatch = await compare(password, findUser.password);

    if (!isMatch) throw new HttpException('Invalid credentials', 403);

    const payload = { sub: findUser.id, username: findUser.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }



  async register(RegisterAuthDto: RegisterAuthDto) {

    const { password } = RegisterAuthDto;
    const hashedPassword = await hash(password,10);
    RegisterAuthDto = { ...RegisterAuthDto, password: hashedPassword };
    const userRegistered = await this.AuthModule.create(RegisterAuthDto);

    return userRegistered;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
