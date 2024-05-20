'use client';

import { columns } from '@/components/columns';
import { DataTable } from '@/components/data-table';
import { taskSchema } from '@/data/schema';
import { useParams } from 'next/navigation';
import { useQueryBoards } from '@/hooks/board';
import { useQueryTasks } from '@/hooks/task';
import { Button } from '@/components/ui/button';
import { useDialogTask } from '@/hooks/dialog-task';

export default function TaskPage() {
  const { boardId } = useParams<{ boardId: string }>();
  const { data: tasks } = useQueryTasks(boardId);
  const { data } = useQueryBoards();

  const setOpenDialogNewTask = useDialogTask((state) => state.setOpen);

  const boardName = data?.find((board) => board.id === boardId)?.title;

  return (
    <>
      <div className="flex h-full flex-1 flex-col space-y-8 p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{boardName}</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this board.
            </p>
          </div>
          <div>
            <Button onClick={() => setOpenDialogNewTask(true)}>
              Create new task
            </Button>
          </div>
        </div>
        <DataTable data={tasks ?? []} columns={columns} />
      </div>
    </>
  );
}
