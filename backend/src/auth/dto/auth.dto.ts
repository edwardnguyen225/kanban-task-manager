import { IsEmail, IsString, Length } from 'class-validator';
import { User } from '@prisma/client';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 30)
  password: string;
}

export class AuthResponse {
  token: string;
  user: User;
}
