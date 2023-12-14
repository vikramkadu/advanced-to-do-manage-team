import Team from '../features/team/Team';
import Tasks from '../features/tasks/Tasks';

type RoutesType = {
  path: string;
  element: JSX.Element;
  errorElement?: JSX.Element;
};

// Routes we will visit
const routes: RoutesType[] = [
  {
    path: '/',
    element: <Tasks />,
  },
  {
    path: '/team',
    element: <Team />,
  },
];

export default routes;
