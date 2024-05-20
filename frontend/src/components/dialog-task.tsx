'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Task,
  TaskLabel,
  TaskPriority,
  TaskStatus,
  taskSchema,
} from '@/data/schema';
import { useParams, useRouter } from 'next/navigation';
import { useMutateTask, useUpdateTask } from '@/hooks/task';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useDialogTask } from '@/hooks/dialog-task';
import { useEffect } from 'react';

export default function DialogNewTask() {
  const boardId = useParams<{ boardId: string }>().boardId;
  const mutateTask = useMutateTask();
  const updateTask = useUpdateTask();
  const { open, setOpen, type, task } = useDialogTask((state) => state);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      id: '',
      title: '',
      priority: TaskPriority.LOW,
      status: TaskStatus.BACKLOG,
      label: TaskLabel.FEATURE,
    },
  });

  useEffect(() => {
    if (type === 'edit' && task) {
      setValue('id', task.id);
      setValue('title', task.title);
      setValue('priority', task.priority);
      setValue('status', task.status);
      setValue('label', task.label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task, type]);

  const onSubmit = handleSubmit(async (data) => {
    if (type === 'edit' && task) {
      const processedData = {
        ...data,
        boardId,
      };

      updateTask.mutate(processedData, {
        onSettled: () => {
          setOpen(false);
        },
      });

      return;
    }

    const processedData = {
      title: data.title,
      priority: data.priority,
      status: data.status,
      label: data.label,
      boardId,
    };

    mutateTask.mutate(processedData, {
      onSettled: () => {
        setOpen(false);
        setValue('title', '');
        setValue('priority', TaskPriority.LOW);
        setValue('status', TaskStatus.BACKLOG);
        setValue('label', TaskLabel.FEATURE);
      },
    });
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
          <DialogDescription>Add a new task to your board.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input placeholder="Should do this" {...register('title')} />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan">Label</Label>
                <Select {...register('label')} defaultValue={TaskLabel.FEATURE}>
                  <SelectTrigger>
                    <SelectValue aria-label={getValues('label')}>
                      {getValues('label')}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(TaskLabel).map((label) => (
                      <SelectItem key={label} value={label}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan">Priority</Label>
                <Select
                  defaultValue={TaskPriority.LOW}
                  {...register('priority')}
                >
                  <SelectTrigger>
                    <SelectValue aria-label={getValues('priority')}>
                      {getValues('priority')}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(TaskPriority).map((label) => (
                      <SelectItem key={label} value={label}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan">Status</Label>
                <Select
                  {...register('status')}
                  defaultValue={TaskStatus.BACKLOG}
                >
                  <SelectTrigger>
                    <SelectValue aria-label={getValues('status')}>
                      {getValues('status')}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(TaskStatus).map((label) => (
                      <SelectItem key={label} value={label}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Continue</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
