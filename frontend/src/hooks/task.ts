import { Task } from '@/data/schema';
import { fetchServer } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

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
    },
  });
}
