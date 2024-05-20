'use client';

import { columns } from '@/components/columns';
import { DataTable } from '@/components/data-table';
import { notFound, useParams } from 'next/navigation';
import { useQueryBoards } from '@/hooks/board';
import { useQueryTasks } from '@/hooks/task';
import { Button } from '@/components/ui/button';
import { useDialogTask } from '@/hooks/dialog-task';

export default function TaskPage() {
  const { boardId } = useParams<{ boardId: string }>();
  const { data: tasks, isLoading } = useQueryTasks(boardId);
  const { data, isLoading: isLoadingBoards } = useQueryBoards();
  const boardName = data?.find((board) => board.id === boardId)?.title;

  const setOpenDialogNewTask = useDialogTask((state) => state.setOpen);

  if (!isLoadingBoards && !data?.find((board) => board.id === boardId)) {
    notFound();
  }

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
        <DataTable isLoading={isLoading} data={tasks ?? []} columns={columns} />
      </div>
    </>
  );
}
