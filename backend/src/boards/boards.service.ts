import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from 'prisma/generated/client';

@Injectable()
export class BoardsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createBoardDto: CreateBoardDto) {
    const id = uuidv4();

    const newBoard = {
      id,
      ...createBoardDto,
      createdAt: undefined,
      // ownerId: '',
    };

    return this.databaseService.board.create({
      data: newBoard,
    });
  }

  async findAll() {
    return this.databaseService.board.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.board.findUnique({ where: { id } });
  }

  async update(id: string, updateBoardDto: Prisma.BoardUpdateInput) {
    const prevBoard = await this.findOne(id);
    const isPrefixUpdated = updateBoardDto.taskPrefix !== prevBoard.taskPrefix;

    if (isPrefixUpdated) {
      const tasks = await this.databaseService.task.findMany({
        where: { boardId: id },
      });

      for (const task of tasks) {
        const newId = `${updateBoardDto.taskPrefix}-${task.id.split('-')[1]}`;

        const newTask = {
          ...task,
          id: newId,
        };

        await this.databaseService.task.update({
          where: { id: task.id },
          data: newTask,
        });
      }
    }

    return this.databaseService.board.update({
      where: { id },
      data: updateBoardDto,
    });
  }

  async remove(id: string) {
    const board = await this.findOne(id);
    this.databaseService.board.delete({ where: { id } });
    return board;
  }
}
