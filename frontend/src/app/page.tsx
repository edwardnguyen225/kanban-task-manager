'use client';

import React, { useEffect } from 'react';
import { useQueryBoards } from '@/hooks/board';
import { Button } from '@/components/ui/button';
import { useDialogNewBoard } from '@/hooks/dialog-new-board';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function MainPage() {
  const setShowNewBoardDialog = useDialogNewBoard((state) => state.setOpen);
  const { data } = useQueryBoards();

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Boards</h2>
          <p className="text-muted-foreground">
            All of your boards are listed here.
          </p>
        </div>
        <div>
          <Button onClick={() => setShowNewBoardDialog(true)}>
            Create new board
          </Button>
        </div>
      </div>

      {data ? (
        <>
          {/* List all board cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {data.map((board) => (
              <Link
                href={`/${board.id}`}
                key={board.id}
                className={cn(
                  'size-full rounded-lg bg-white p-4 shadow-md',
                  // Floating effect
                  'transform transition-transform duration-200 hover:-translate-y-1',
                  // Hover effect
                  'hover:shadow-lg',
                )}
              >
                <h3 className="text-lg font-semibold">{board.title}</h3>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">Boards:</span>
            <span className="font-medium">{data.length}</span>

            <span className="text-muted-foreground">Last updated:</span>
            <span className="font-medium">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
