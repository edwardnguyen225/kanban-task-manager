import {
  TaskLabel,
  TaskPriority,
  TaskPriorityIcons,
  TaskStatus,
  TaskStatusIcons,
} from './schema';

export const labels = Object.values(TaskLabel).map((label) => ({
  value: label,
  label: label.toLowerCase(),
}));

export const statuses = Object.values(TaskStatus).map((status) => ({
  value: status,
  label: status.toLowerCase().replace('_', ' '),
  icon: TaskStatusIcons[status],
}));

export const priorities = Object.values(TaskPriority).map((priority) => ({
  value: priority,
  label: priority.toLowerCase(),
  icon: TaskPriorityIcons[priority],
}));
