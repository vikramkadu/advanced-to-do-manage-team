// UI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Icons
import EventNoteIcon from '@mui/icons-material/EventNote';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import DoneAllIcon from '@mui/icons-material/DoneAll';

// Hooks and Functions
import { useTheme } from '@mui/system';

// Data and Types
import { TaskTypes } from '../../../types/data.types';

// ------------------

type TasksHeadProps = {
  taskType: TaskTypes;
};

const taskTypeUIStyles = (type: TaskTypes) => {
  switch (type) {
    case 'todo':
      return {
        color: 'secondary3',
        title: 'To-Do',
        subTitle: 'Tasks to be done soon',
      };
    case 'progress':
      return {
        color: 'secondary2',
        title: 'In Progress',
        subTitle: 'Tasks in working',
      };

    case 'done':
      return {
        color: 'secondary',
        title: 'Done',
        subTitle: 'Completed Tasks',
      };
  }
};

function TasksHead({ taskType }: TasksHeadProps) {
  const { palette } = useTheme();
  const { color, title, subTitle } = taskTypeUIStyles(taskType);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        p: 2,
        bgcolor:
          palette.mode === 'light'
            ? palette[color]?.light
            : palette[color]?.dark,
        borderRadius: '10px 10px 0 0',
      }}>
      {taskType === 'todo' ? (
        <EventNoteIcon
          sx={{
            bgcolor: palette[color]?.main,
            color: palette[color]?.light,
            borderRadius: '10px',
            fontSize: '45px',
            p: 1,
            mr: 2,
          }}
        />
      ) : taskType === 'progress' ? (
        <RotateRightIcon
          sx={{
            bgcolor: palette[color]?.main,
            color: palette[color]?.light,
            borderRadius: '10px',
            fontSize: '45px',
            p: 1,
            mr: 2,
          }}
        />
      ) : (
        <DoneAllIcon
          sx={{
            bgcolor: palette[color]?.main,
            color: palette[color]?.light,
            borderRadius: '10px',
            fontSize: '45px',
            p: 1,
            mr: 2,
          }}
        />
      )}

      <Box>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {subTitle}
        </Typography>
      </Box>
    </Box>
  );
}

export default TasksHead;
