import { create } from 'zustand';

interface DialogNewBoardState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useDialogNewBoard = create<DialogNewBoardState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));
