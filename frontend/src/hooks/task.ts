import { toast } from '@/components/ui/use-toast';
import { Task } from '@/data/schema';
import { fetchServer } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const getTasksQueryKey = (boardId: string) => ['boards', boardId];

export function useQueryTasks(boardId: string) {
  return useQuery<Task[]>({
    queryKey: getTasksQueryKey(boardId),
    queryFn: async () => {
      const response = await fetchServer(`tasks?boardId=${boardId}`);
      return response.json();
    },
  });
}

export function useMutateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      task: Pick<Task, 'label' | 'priority' | 'status' | 'title'> & {
        boardId: string;
      },
    ) => {
      console.log('task', task);
      const response = await fetchServer('tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    },
    onSuccess: (task: Task & { boardId: string }) => {
      queryClient.invalidateQueries({
        queryKey: getTasksQueryKey(task.boardId),
      });
      toast({
        title: '✅ Task created successfully',
      });
    },
    onError: (error) => {
      toast({
        title: '❌ Failed to create task',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: Task & { boardId: string }) => {
      const response = await fetchServer(`tasks/${task.id}`, {
        method: 'PATCH',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    },
    onSuccess: (task: Task & { boardId: string }) => {
      queryClient.invalidateQueries({
        queryKey: getTasksQueryKey(task.boardId),
      });
      toast({
        title: '✅ Task updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: '❌ Failed to update task',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      const response = await fetchServer(`tasks/${taskId}`, {
        method: 'DELETE',
      });
      return response.json();
    },
    onSuccess: (data: { boardId: string }) => {
      queryClient.invalidateQueries({
        queryKey: getTasksQueryKey(data.boardId),
      });
      toast({
        title: '✅ Task deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: '❌ Failed to delete task',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
