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
import { Dialog, DialogTrigger } from './ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Board } from '@/data/schema';
import { useParams, usePathname, useRouter } from 'next/navigation';
import DialogNewBoard from './dialog-new-board';

const boards: Board[] = [
  {
    id: '1',
    title: 'Default Board',
    tasks: ['1', '2', '3'],
    taskPrefix: 'DEF',
  },
  {
    id: '2',
    title: 'Team Board',
    tasks: ['4', '5', '6'],
    taskPrefix: 'TEAM',
  },
  {
    id: '3',
    title: 'Personal Board',
    tasks: ['7', '8', '9'],
    taskPrefix: 'PER',
  },
];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface BoardSwitcherProps extends PopoverTriggerProps {}

export default function BoardSwitcher({ className }: BoardSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewBoardDialog, setShowNewBoardDialog] = React.useState(false);

  const [title, setTitle] = React.useState('');

  const router = useRouter();
  const pathname = usePathname();
  const { boardId } = useParams<{ boardId: string }>();
  React.useEffect(() => {
    if (pathname === '/') {
      setTitle('Overview');
      return;
    }

    const board = boards.find((board) => board.id === boardId);
    setTitle(board?.title ?? 'Board');
  }, [pathname, boardId]);

  const redirectToHome = () => {
    router.push('/');
  };

  const redirectToBoard = (boardId: string) => {
    console.log('boardId', boardId);
    setOpen(false);
    router.push(`/${boardId}`);
  };

  return (
    <Dialog open={showNewBoardDialog} onOpenChange={setShowNewBoardDialog}>
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
                {boards.map((board) => (
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
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewBoardDialog(true);
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Board
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogNewBoard setShowNewBoardDialog={setShowNewBoardDialog} />
    </Dialog>
  );
}
