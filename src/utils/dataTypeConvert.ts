import { Jobs, Member, Rating, Task, TaskTypes } from '../types/data.types';

type TaskDB = {
  id: string;
  type: string;
  title: string;
  description: string;
  developers: string[];
  estimatedTime: number; // this is the job predicted time it will take and its expressed in seconds
  startingTime?: number;
  endingTime?: number;
  rating?: number;
};

type MemberDB = {
  id: string;
  name: string;
  job: string;
  image: string;
};

/**
 * Update tasks types and update some props
 * such as: changing rating from number to enum
 *
 * @param tasks Tasks existed in the data folder
 * @returns Tasks after updating some data and change type to be ready to use
 */
export const convertToTasksType = (tasks: TaskDB[]): Task[] => {
  const clonedTasks = tasks.map((task: TaskDB) => {
    const clonedTask: Task = {
      id: '',
      type: 'todo',
      title: '',
      description: '',
      developers: [],
      estimatedTime: 0,
    };
    clonedTask.id = task.id;

    clonedTask.type = task.type as TaskTypes;
    clonedTask.title = task.title;
    clonedTask.description = task.description;
    clonedTask.developers.push(...task.developers);
    clonedTask.estimatedTime = task.estimatedTime;

    // Convert from seconds
    if (task?.startingTime) {
      clonedTask.startingTime = task.startingTime * 1000;
    }
    if (task?.endingTime) {
      clonedTask.endingTime = task.endingTime * 1000;
    }
    if (task?.rating) {
      clonedTask.rating =
        task.rating > 1
          ? Rating.aheadOfSchedule
          : task.rating < 1
          ? Rating.behindSchedule
          : Rating.onSchedule;
    }
    return clonedTask;
  });
  return clonedTasks;
};

/**
 * Update team types
 *
 * @param team Deveolopers team existed in the data folder
 * @returns Team after updating some data and change type to be ready to use
 */
export const convertToTeamType = (team: MemberDB[]): Member[] => {
  const clonedTeam = team.map((member: MemberDB) => {
    const clonedMember: Member = {
      id: '',
      name: '',
      job: 'front-end',
      image: '',
    };
    clonedMember.id = member.id;
    clonedMember.name = member.name;
    clonedMember.job = member.job as Jobs;
    clonedMember.image = member.image;

    return clonedMember;
  });
  return clonedTeam;
};
