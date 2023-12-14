import { Task } from '../types/data.types';

// Return string where eash word with a capital letter
export const capitalizeString = (str: string): string =>
  str
    .split(' ')
    .map((e) => e.charAt(0).toUpperCase().concat(e.slice(1)))
    .join(' ');

/**
 * Generating unique ID based on Date
 *
 * @returns Unique ID
 */
export const idGenerator = (): string => {
  return `0x${Date.now().toString().slice(5)}${Math.floor(
    Math.random() * 100
  )}`;
};

/**
 * Getting percentage of the total work done in the project by depending on the estimated time
 *
 * @param tasks Current tasks in the program
 * @returns Percentage of done tasks
 */
export const getCurrentProgress = (tasks: Task[]): number => {
  const todoTime = tasks
    .filter((task) => task.type === 'todo')
    .map((e) => e.estimatedTime)
    .reduce((acc, curr) => acc + curr, 0);
  const progressTime = tasks
    .filter((task) => task.type === 'progress')
    .map((e) => e.estimatedTime)
    .reduce((acc, curr) => acc + curr, 0);
  const doneTime = tasks
    .filter((task) => task.type === 'done')
    .map((e) => e.estimatedTime)
    .reduce((acc, curr) => acc + curr, 0);

  const total = todoTime + progressTime + doneTime;
  if (total === 0) return 0;
  return (doneTime / total) * 100;
};
