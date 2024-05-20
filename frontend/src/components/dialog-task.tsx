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
import { useParams } from 'next/navigation';
import { useMutateTask, useUpdateTask } from '@/hooks/task';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useDialogTask } from '@/hooks/dialog-task';
import { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

export default function DialogNewTask() {
  const boardId = useParams<{ boardId: string }>().boardId;
  const mutateTask = useMutateTask();
  const updateTask = useUpdateTask();
  const [isCreatingOrUpdating, setIsCreatingOrUpdating] = useState(false);
  const { open, setOpen, type, task } = useDialogTask((state) => state);

  const form = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      id: '',
      title: '',
      priority: TaskPriority.LOW,
      status: TaskStatus.BACKLOG,
      label: TaskLabel.FEATURE,
    },
  });

  const closeDialog = () => {
    setOpen(false);
    form.reset();
    form.clearErrors();
  };

  useEffect(() => {
    if (type === 'edit' && task) {
      form.reset(task);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task, type]);

  const onSubmit = form.handleSubmit(async (data) => {
    if (type === 'edit' && task) {
      const processedData = {
        ...data,
        boardId,
      };

      setIsCreatingOrUpdating(true);
      updateTask.mutate(processedData, {
        onSettled: () => {
          setIsCreatingOrUpdating(false);
          closeDialog();
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

    setIsCreatingOrUpdating(true);
    mutateTask.mutate(processedData, {
      onSettled: () => {
        setIsCreatingOrUpdating(false);
        closeDialog();
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
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <div className="space-y-4 py-2 pb-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="ACM Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your label" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(TaskLabel).map((label) => (
                          <SelectItem key={label} value={label}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose a label that best describes your task.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select task status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(TaskStatus).map((label) => (
                          <SelectItem key={label} value={label}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the status of your task.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select task priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(TaskPriority).map((label) => (
                          <SelectItem key={label} value={label}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the priority of your task.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                disabled={isCreatingOrUpdating}
                variant="outline"
                onClick={closeDialog}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreatingOrUpdating}>
                Continue
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
