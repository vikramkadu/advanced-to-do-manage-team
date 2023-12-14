import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Task } from '../../types/data.types';
import { getCurrentProgress } from '../../utils/algorithms';

// team is an array of object, and each object should have the same keys in Member type to prevent errors
type InitialStateProps = {
  tasks: Task[];
  firstFetch: boolean;
  progress: number;
};
const initialState: InitialStateProps = {
  tasks: [],
  firstFetch: true,
  progress: 0,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    fetchTasks: (state, action: PayloadAction<Task[]>) => {
      if (state.firstFetch) {
        state.tasks.push(...action.payload);
        state.progress = getCurrentProgress(action.payload);
        localStorage.setItem('tasks', JSON.stringify(action.payload));
        state.firstFetch = false;
      }
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      state.progress = getCurrentProgress(state.tasks);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      state.progress = getCurrentProgress(state.tasks);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      state.progress = getCurrentProgress(state.tasks);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.team)`
export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectFirstFetch = (state: RootState) => state.tasks.firstFetch;
export const selectProgress = (state: RootState) => state.tasks.progress;

export const { fetchTasks, addTask, updateTask, deleteTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
