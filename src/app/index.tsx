import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// UI Components
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/system';
import { lightTheme, darkTheme } from './theme';
import Holder from '../components/fixedLayout/Holder';

// font
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

// hooks and functions
import { useAppDispatch } from './hooks';
import { fetchMembers } from '../features/team/teamSlice';
import { fetchTasks } from '../features/tasks/tasksSlice';

// Data and Types
import routes from './routes';
import teamDB from '../data/team.json';
import tasksDB from '../data/tasks.json';
import { Member, Task } from '../types/data.types';
import {
  convertToTasksType,
  convertToTeamType,
} from '../utils/dataTypeConvert';

// ----------------------

/**
 * Making base name for the website (needed in deployment)
 */
const router = createBrowserRouter(routes, {
  basename: '/',
});

/**
 * Application Component
 *
 * @returns Web aplication JSX Element
 */
function App() {
  // Getting stored theme from localstorage
  const tempStoredMode: string = localStorage.getItem('theme') || 'light';
  let storedMode: 'light' | 'dark' = 'light';
  if (tempStoredMode === 'light' || tempStoredMode === 'dark') {
    storedMode = tempStoredMode;
  }
  const [mode, setMode] = useState<'light' | 'dark'>(storedMode);
  const dispatch = useAppDispatch();

  // getting Tasks from local storage
  const localTasks: Task[] = JSON.parse(
    localStorage.getItem('tasks') || '[]'
  ) as Task[];
  // Getting team members in the team.json file
  const team: Member[] = convertToTeamType(teamDB);

  // Store data in our store
  useEffect(() => {
    // If there is no tasks in local storage then we will fetch the tasks in the tasks.json file
    if (localTasks.length > 0) {
      dispatch(fetchTasks(localTasks));
    } else {
      dispatch(fetchTasks(convertToTasksType(tasksDB)));
    }
    dispatch(fetchMembers(team));
  }, [dispatch, localTasks, team]);

  // Return Application rapped by our theme
  return (
    <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      <CssBaseline enableColorScheme />
      <Holder mode={mode} setMode={setMode}>
        <RouterProvider router={router} />
      </Holder>
    </ThemeProvider>
  );
}

export default App;
