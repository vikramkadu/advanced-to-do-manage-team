import React from 'react';

// UI Components
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import MemberCard from '../../../features/tasks/components/sub/MemberCard';

// Icons
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// Hooks and Functions
import { useAppSelector } from '../../../app/hooks';
import { selectTeam } from '../../../features/team/teamSlice';

// Data and Types
import { Task } from '../../../types/data.types';

// ------------

type AddDevsProps = {
  taskId: string;
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
};

/**
 *  Add and delete developers of a specific task
 *
 * @param props {taskId => task id that we will use to get the dev team for that task}
 * @returns Developers as toggle buttons to select from them
 */
function AddDevs({ taskId, task, setTask }: AddDevsProps) {
  const team = useAppSelector(selectTeam);
  const [devs, setDevs] = React.useState(() => task?.developers);

  /**
   * Adding new developer to the team of the given task
   *
   * @param event Select Event
   * @param newDevs team member
   */
  const handleSelectDevs = (
    event: React.MouseEvent<HTMLElement>,
    newDevs: string[]
  ) => {
    setDevs(newDevs);
    setTask((prevTask: Task) => ({ ...prevTask, developers: newDevs }));
  };

  return (
    <Box width="100%">
      <ToggleButtonGroup
        fullWidth
        orientation="vertical"
        value={devs}
        onChange={handleSelectDevs}>
        {team.map((member) => (
          <ToggleButton
            key={member.id}
            value={member.id}
            aria-label={member.name}>
            {devs?.includes(member.id) ? (
              <CheckBoxIcon />
            ) : (
              <CheckBoxOutlineBlankIcon />
            )}
            <MemberCard member={member} />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}

export default AddDevs;
