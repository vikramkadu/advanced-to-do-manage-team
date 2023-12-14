export type TaskTypes = 'todo' | 'progress' | 'done';

export type Jobs =
  | 'front-end'
  | 'back-end'
  | 'UI/UX designer'
  | 'quality assurance';

export enum Rating {
  behindSchedule,
  onSchedule,
  aheadOfSchedule,
}

export type Member = {
  id: string;
  name: string;
  job: Jobs;
  image: string;
};

export type Task = {
  id: string;
  type: TaskTypes;
  title: string;
  description: string;
  developers: string[];
  estimatedTime: number; // this is the job predicted time it will take and its expressed in seconds
  startingTime?: number;
  endingTime?: number;
  rating?: Rating;
};
