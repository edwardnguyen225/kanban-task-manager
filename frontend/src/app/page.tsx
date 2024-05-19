'use client';

import React, { useEffect } from 'react';
import { useQueryBoards } from '@/hooks/board';
import { Button } from '@/components/ui/button';
import { useDialogNewBoard } from '@/hooks/dialog-new-board';

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
        <div className="flex items-center space-x-4">
          <span className="text-muted-foreground">Boards:</span>
          <span className="font-medium">{data.length}</span>

          <span className="text-muted-foreground">Last updated:</span>
          <span className="font-medium">{new Date().toLocaleDateString()}</span>

          <span className="text-muted-foreground">Total tasks:</span>
          <span className="font-medium">
            {data.reduce((acc, board) => acc + board.tasks.length, 0)}
          </span>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
