import { create } from 'zustand';

interface DialogNewTaskState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useDialogNewTask = create<DialogNewTaskState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));
