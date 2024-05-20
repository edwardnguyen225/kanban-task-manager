'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useMutateBoard } from '@/hooks/board';
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
import { useDialogNewBoard } from '@/hooks/dialog-new-board';
import { CreateBoard, createBoardSchema } from '@/data/schema';
import { useRouter } from 'next/navigation';

export default function DialogNewBoard() {
  const router = useRouter();
  const mutateBoard = useMutateBoard();
  const { open, setOpen } = useDialogNewBoard((state) => state);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreateBoard>({
    resolver: zodResolver(createBoardSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    mutateBoard.mutate(data, {
      onSuccess: (board) => {
        router.push(`/${board.id}`);
      },
      onSettled: () => {
        setOpen(false);
      },
    });
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create board</DialogTitle>
          <DialogDescription>
            Add a new board to your workspace.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="title">Board name</Label>
                <Input placeholder="Acme Inc." {...register('title')} />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="taskPrefix">Task prefix</Label>
                <Input
                  placeholder="ACM"
                  {...register('taskPrefix')}
                  onBlur={() => {
                    const value = getValues('taskPrefix');
                    setValue('taskPrefix', value.toUpperCase());
                  }}
                />
                {errors.taskPrefix && (
                  <p className="text-sm text-red-500">
                    {errors.taskPrefix.message}
                  </p>
                )}
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
