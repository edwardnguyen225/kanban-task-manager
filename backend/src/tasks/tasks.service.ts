import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'prisma/generated/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateTaskDto } from './dto/tasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTaskDto: CreateTaskDto) {
    const { boardId } = createTaskDto;
    const board = await this.databaseService.board.findUnique({
      where: { id: boardId },
    });

    if (!board) {
      throw new NotFoundException();
    }

    const taskCount = await this.databaseService.task.count({
      where: { boardId },
    });

    const newTask = {
      id: `${board.taskPrefix}-${taskCount + 1}`,
      ...createTaskDto,
    } as Prisma.TaskCreateInput;

    return this.databaseService.task.create({
      data: newTask,
    });
  }

  async findAll() {
    return this.databaseService.task.findMany();
  }

  async findManyByBoardId(boardId: string) {
    return this.databaseService.task.findMany({
      where: { boardId, tombstone: false },
    });
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
    return this.databaseService.task.update({
      where: { id },
      data: { tombstone: true },
    });
  }
}
