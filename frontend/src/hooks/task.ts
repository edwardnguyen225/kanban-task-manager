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
  const { boardId } = useParams<{ boardId: string }>();
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
    onSuccess: (task: Task) => {
      queryClient.invalidateQueries({
        queryKey: getTasksQueryKey(boardId),
      });
    },
  });
}
