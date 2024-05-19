import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, LoginDto } from './dto/auth.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwt: JwtService,
  ) {}

  async login(data: LoginDto): Promise<AuthResponse> {
    const { email, password } = data;

    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException();
    }

    // const passwordValid = await bcrypt.compareSync(password, user.password);
    const passwordValid = user.password === password;

    if (!passwordValid) {
      throw new UnauthorizedException('invalid_password');
    }

    delete user.password;

    return {
      token: this.jwt.sign({ email }),
      user,
    };
  }
}
