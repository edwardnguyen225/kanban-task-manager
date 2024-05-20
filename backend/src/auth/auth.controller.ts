import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, AuthResponse, RegisterDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'prisma/generated/client';

import AuthUser from '../common/decorators/auth-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  login(@Body() data: LoginDto): Promise<AuthResponse> {
    return this.service.login(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@AuthUser() user: User): User {
    return user;
  }

  @Post('register')
  register(@Body() data: RegisterDto): Promise<AuthResponse> {
    return this.service.register(data);
  }
}
