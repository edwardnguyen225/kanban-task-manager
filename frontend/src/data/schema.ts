import { z } from 'zod';
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

export enum TaskStatus {
  BACKLOG = 'BACKLOG',
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

export const TaskStatusIcons = {
  [TaskStatus.BACKLOG]: QuestionMarkCircledIcon,
  [TaskStatus.TODO]: CircleIcon,
  [TaskStatus.IN_PROGRESS]: StopwatchIcon,
  [TaskStatus.DONE]: CheckCircledIcon,
  [TaskStatus.CANCELLED]: CrossCircledIcon,
};

export enum TaskLabel {
  BUG = 'BUG',
  FEATURE = 'FEATURE',
  DOCUMENTATION = 'DOCUMENTATION',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export const TaskPriorityIcons = {
  [TaskPriority.LOW]: ArrowDownIcon,
  [TaskPriority.MEDIUM]: ArrowRightIcon,
  [TaskPriority.HIGH]: ArrowUpIcon,
};

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(36),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

export const boardSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(30),
  taskPrefix: z.string().min(1).max(3),
  tasks: z.array(z.string()),
});

export type Board = z.infer<typeof boardSchema>;

export const createBoardSchema = boardSchema.pick({
  title: true,
  taskPrefix: true,
});
export type CreateBoard = z.infer<typeof createBoardSchema>;
