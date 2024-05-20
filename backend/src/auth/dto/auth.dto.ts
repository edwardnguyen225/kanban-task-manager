import { IsEmail, IsString, Length } from 'class-validator';
import { User } from 'prisma/generated/client';

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

export class RegisterDto {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 64)
  password: string;
}
