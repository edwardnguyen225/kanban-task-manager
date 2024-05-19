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
  title: z.string(),
  taskPrefix: z.string(),
  tasks: z.array(z.string()),
});

export type Board = z.infer<typeof boardSchema>;
