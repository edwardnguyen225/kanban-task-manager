import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/tasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTaskDto: CreateTaskDto) {
    const id = uuidv4();
    const { boardId } = createTaskDto;
    const board = await this.databaseService.board.findUnique({
      where: { id: boardId },
    });

    console.log('DEBUG - board', board);
    if (!board) {
      throw new NotFoundException();
    }

    const newTask = {
      id,
      ...createTaskDto,
    } as Prisma.TaskCreateInput;

    console.log('DEBUG - newTask', newTask);

    return this.databaseService.task.create({
      data: newTask,
    });
  }

  async findAll() {
    return this.databaseService.task.findMany();
  }

  async findManyByBoardId(boardId: string) {
    return this.databaseService.task.findMany({ where: { boardId } });
  }

  async findOne(id: string) {
    return this.databaseService.task.findUnique({ where: { id } });
  }

  async update(id: string, updateBoardDto: Prisma.BoardUpdateInput) {
    return this.databaseService.task.update({
      where: { id },
      data: updateBoardDto,
    });
  }

  async remove(id: string) {
    const task = await this.findOne(id);
    this.databaseService.task.delete({ where: { id } });
    return task;
  }
}
