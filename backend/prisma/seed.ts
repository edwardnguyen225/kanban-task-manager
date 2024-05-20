import { faker } from '@faker-js/faker';
import {
  Prisma,
  PrismaClient,
  TaskLabel,
  TaskPriority,
  TaskStatus,
} from './generated/client';
import { v4 as uuidv4 } from 'uuid';

const fakeBoards = Array.from({ length: 5 }, () => ({
  id: uuidv4(),
  title:
    faker.hacker.noun().replace(/^./, (letter) => letter.toUpperCase()) +
    ' ' +
    faker.number.int({
      min: 100,
      max: 101,
    }),
  taskPrefix: faker.hacker.abbreviation(),
}));

const statuses = [
  'BACKLOG',
  'TODO',
  'IN_PROGRESS',
  'DONE',
  'CANCELLED',
] as TaskStatus[];

const labels = ['BUG', 'FEATURE', 'DOCUMENTATION'] as TaskLabel[];

const priorities = ['LOW', 'MEDIUM', 'HIGH'] as TaskPriority[];

// For each board, create 100 tasks
const getFakeTasks = (
  boardId: string,
  taskPrefix: string,
  total = 100,
): Prisma.TaskCreateInput[] => {
  return Array.from({ length: total }, (_, index) => ({
    id: `${taskPrefix}-${index}`,
    boardId,
    title: faker.hacker
      .phrase()
      .replace(/^./, (letter) => letter.toUpperCase()),
    status: faker.helpers.arrayElement(statuses),
    label: faker.helpers.arrayElement(labels),
    priority: faker.helpers.arrayElement(priorities),
  }));
};

const prisma = new PrismaClient();
async function main() {
  // Truncate all tables
  await prisma.task.deleteMany();
  await prisma.board.deleteMany();

  // Create boards
  await prisma.board.createMany({
    data: fakeBoards,
  });

  fakeBoards.forEach(async (board) => {
    const tasks = getFakeTasks(board.id, board.taskPrefix);
    await prisma.task.createMany({
      data: tasks,
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
