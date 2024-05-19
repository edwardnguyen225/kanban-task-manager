import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [UsersModule, DatabaseModule, BoardsModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
