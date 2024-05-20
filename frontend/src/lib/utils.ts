import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SERVER_ENDPOINT =
  process.env.BACKEND_ENDPOINT ?? 'https://kanban-server.trinhan.dev/api/';
export function fetchServer<T>(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
): Promise<Response> {
  return fetch(`${SERVER_ENDPOINT}${input}`, init);
}
