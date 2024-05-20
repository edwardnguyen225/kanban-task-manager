import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchServer } from '@/lib/utils';
import { Board, CreateBoard } from '@/data/schema';

const BOARD_QUERY_KEY = ['boards'];

export function useQueryBoards() {
  return useQuery<Board[]>({
    queryKey: BOARD_QUERY_KEY,
    queryFn: async () => {
      const response = await fetchServer('boards');
      return response.json();
    },
  });
}

export function useMutateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (board: CreateBoard) => {
      const response = await fetchServer('boards', {
        method: 'POST',
        body: JSON.stringify(board),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    },
    onSuccess: (board: Board) => {
      queryClient.invalidateQueries({
        queryKey: BOARD_QUERY_KEY,
      });
    },
  });
}
