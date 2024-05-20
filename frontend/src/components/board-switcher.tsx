'use client';

import * as React from 'react';
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';
import { DialogTrigger } from './ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useQueryBoards } from '@/hooks/board';
import { useDialogNewBoard } from '@/hooks/dialog-new-board';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface BoardSwitcherProps extends PopoverTriggerProps {}

export default function BoardSwitcher({ className }: BoardSwitcherProps) {
  const { data: boards } = useQueryBoards();

  const [open, setOpen] = React.useState(false);
  const setShowNewBoardDialog = useDialogNewBoard((state) => state.setOpen);

  const [title, setTitle] = React.useState('');

  const router = useRouter();
  const pathname = usePathname();
  const { boardId } = useParams<{ boardId: string }>();
  React.useEffect(() => {
    if (pathname === '/') {
      setTitle('Overview');
      return;
    }

    const board = boards?.find((board) => board.id === boardId);
    setTitle(board?.title ?? 'Board');
  }, [pathname, boardId, boards]);

  const redirectToHome = () => {
    router.push('/');
  };

  const redirectToBoard = (boardId: string) => {
    setOpen(false);
    router.push(`/${boardId}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className={cn('w-[200px] justify-between', className)}
        >
          {title}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search board..." />
            <CommandEmpty>No board found.</CommandEmpty>

            <CommandGroup heading="Hi there">
              <CommandItem className="text-sm" onSelect={redirectToHome}>
                Overview
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    pathname === `/` ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />

            <CommandGroup heading="Your Boards">
              {boards && boards.length > 0 ? (
                boards.map((board) => (
                  <CommandItem
                    key={board.id}
                    onSelect={() => redirectToBoard(board.id)}
                    className="text-sm"
                  >
                    {board.title}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        boardId === board.id ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))
              ) : (
                <p className="cursor-default px-2 py-1.5 text-sm">
                  No board found.
                </p>
              )}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  setShowNewBoardDialog(true);
                }}
              >
                <PlusCircledIcon className="mr-2 h-5 w-5" />
                Create Board
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
