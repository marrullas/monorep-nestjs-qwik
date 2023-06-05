import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '../users/schemas/users.schema';
import { JwtModule } from '@nestjs/jwt';
//import { Auth, AuthSchema } from './schemas/auth.schema';

const configService = new ConfigService();


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ConfigModule,
  JwtModule.register({
    global: true,
    secret: configService.get<string>('SECRET_KEY'),
    signOptions: { expiresIn: '60s' },
  }),
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
