'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Board, boardSchema, createBoardSchema } from '@/data/schema';
import { useQueryBoards, useUpdateBoard } from '@/hooks/board';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function BoardEditForm() {
  const { boardId } = useParams<{ boardId: string }>();
  const { data } = useQueryBoards();

  const [isUpdating, setIsUpdating] = useState(false);
  const updateBoard = useUpdateBoard();

  const form = useForm<Board>({
    resolver: zodResolver(boardSchema.omit({ tasks: true })),
    defaultValues: data?.find((board) => board.id === boardId),
    mode: 'onChange',
  });

  useEffect(() => {
    form.reset(data?.find((board) => board.id === boardId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, boardId]);

  const onSubmit = form.handleSubmit(async (data) => {
    setIsUpdating(true);
    updateBoard.mutate(data, {
      onSettled: () => {
        setIsUpdating(false);
      },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
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
          name="taskPrefix"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task prefix</FormLabel>
              <FormControl>
                <Input placeholder="ACM" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isUpdating} className="min-w-32">
          {isUpdating ? 'Updating...' : 'Update Board'}
        </Button>
      </form>
    </Form>
  );
}
