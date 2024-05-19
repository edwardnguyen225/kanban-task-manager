import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';

import { columns } from '@/components/columns';
import { DataTable } from '@/components/data-table';
import { taskSchema } from '@/data/schema';

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/data/tasks.json'),
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
  const boardName = 'My Board';
  const tasks = await getTasks();

  return (
    <>
      <div className="flex h-full flex-1 flex-col space-y-8 p-8">
        <div className="flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{boardName}</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this board.
            </p>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
