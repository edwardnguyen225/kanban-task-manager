import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async findOne(email: string): Promise<User> {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException();
    }

    delete user.password;
    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const existing = await this.databaseService.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictException('username_already_exists');
    }

    // the second argument ( 10 ) is just a "cost factor".
    // the higher the cost factor, the more difficult is brute-forcing
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Generate new uuid
    const id = uuidv4();

    const user = await this.databaseService.user.create({
      data: {
        id,
        password: hashedPassword,
        ...data,
      },
    });

    delete user.password;
    return user;
  }
}
