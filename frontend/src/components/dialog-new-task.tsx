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
import { useMutateTask } from '@/hooks/task';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useDialogNewTask } from '@/hooks/dialog-new-task';
import { useEffect } from 'react';

export default function DialogNewTask() {
  const boardId = useParams<{ boardId: string }>().boardId;
  const router = useRouter();
  const mutateTask = useMutateTask();
  const { open, setOpen } = useDialogNewTask((state) => state);

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
      title: 'Lorem Ipsum',
      priority: TaskPriority.LOW,
      status: TaskStatus.BACKLOG,
      label: TaskLabel.FEATURE,
    },
  });

  useEffect(() => {
    console.log('DEBUG', errors);

    return () => {};
  }, [errors]);

  const onSubmit = handleSubmit(async (data) => {
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
        setValue('title', 'Lorem ' + new Date().toISOString());
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
                  {...register('priority')}
                  defaultValue={TaskPriority.LOW}
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
