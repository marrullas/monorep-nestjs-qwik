import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthGuard } from '../core/auth.guard';
//import { AllExceptionsFilter } from '../filters/AllExceptionsFilter';
//import { UpdateAuthDto } from './dto/register-auth.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({status: 201, description: 'The user has been successfully registered.'})
  @ApiResponse({status: 400, description: 'Forbidden.'})
  //@UseFilters(AllExceptionsFilter)
  create(@Body() RegisterAuthDto: RegisterAuthDto) {
    return this.authService.register(RegisterAuthDto);
    //return this.authService.create(loginAuthDto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {

    return this.authService.login(loginAuthDto);

    //return 'This action login in a user';
  }

  @UseGuards(AuthGuard)
  @Get('me/:id')
  me(@Param('id') id: string) {
    return `This action returns a #${id} auth`;
  }

}
