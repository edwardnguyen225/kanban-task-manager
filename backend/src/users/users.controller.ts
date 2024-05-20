import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { User } from 'prisma/generated/client';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get(':email')
  findOne(@Param('email') email: string): Promise<User> {
    return this.service.findOne(email);
  }
}
