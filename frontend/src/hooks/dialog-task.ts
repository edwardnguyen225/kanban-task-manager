import { Task } from '@/data/schema';
import { create } from 'zustand';

interface DialogTaskState {
  type: 'new' | 'edit';
  task: Task | undefined;
  open: boolean;
  setOpen: (
    open: boolean,
    type?: DialogTaskState['type'],
    task?: DialogTaskState['task'],
  ) => void;
}

export const useDialogTask = create<DialogTaskState>((set) => ({
  type: 'new',
  task: undefined,
  open: false,
  setOpen: (open, type, task) => set({ open, type, task }),
}));
