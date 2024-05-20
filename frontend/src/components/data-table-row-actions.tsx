'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { labels } from '../data/data';
import { taskSchema } from '../data/schema';
import { useDialogTask } from '@/hooks/dialog-task';
import { useDeleteTask, useMutateTask, useUpdateTask } from '@/hooks/task';
import { useParams } from 'next/navigation';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const boardId = useParams<{ boardId: string }>().boardId;
  const { setOpen } = useDialogTask((state) => state);
  const task = taskSchema.parse(row.original);

  const mutateTask = useMutateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleCopy = () => {
    const newTask = {
      title: task.title,
      priority: task.priority,
      status: task.status,
      label: task.label,
      boardId,
    };
    mutateTask.mutate(newTask, {
      onSettled: () => {
        setOpen(false);
      },
    });
  };

  const handleChangeLabel = (label: string) => {
    const updatedTask = {
      ...task,
      label,
      boardId,
    };
    updateTask.mutate(updatedTask, {
      onSettled: () => {
        setOpen(false);
      },
    });
  };

  const handleDelete = () => {
    deleteTask.mutate(task.id, {
      onSettled: () => {
        setOpen(false);
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            setOpen(true, 'edit', task);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopy}>Make a copy</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem
                  key={label.value}
                  value={label.value}
                  onClick={() => handleChangeLabel(label.value)}
                >
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
