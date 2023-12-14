import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import teamReducer from '../features/team/teamSlice';
import tasksReducer from '../features/tasks/tasksSlice';

/**
 * Our store where we but data to make it sync with our app components
 */
export const store = configureStore({
  // reducers
  reducer: {
    team: teamReducer,
    tasks: tasksReducer,
  },
});

// Dispatching function
export type AppDispatch = typeof store.dispatch;
// Root type
export type RootState = ReturnType<typeof store.getState>;
// Thunk Actions for asyncronomous requests
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
