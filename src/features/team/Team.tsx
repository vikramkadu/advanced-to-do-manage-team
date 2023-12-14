// Hooks and Functions
import { useAppSelector } from '../../app/hooks';
import { selectTeam } from './teamSlice';

// ------------------------

/**
 * Previewing All team members information (COMING SOON...)
 *
 * @returns team members
 */
function Team() {
  const team = useAppSelector(selectTeam);

  return <div>{JSON.stringify(team)}</div>;
}

export default Team;
