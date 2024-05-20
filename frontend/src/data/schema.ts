import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
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
