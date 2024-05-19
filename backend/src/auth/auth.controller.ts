import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, AuthResponse } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  login(@Body() data: LoginDto): Promise<AuthResponse> {
    return this.service.login(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Req() req: Request): User {
    const user = req.user as User;
    delete user.password;
    return user;
  }
}
