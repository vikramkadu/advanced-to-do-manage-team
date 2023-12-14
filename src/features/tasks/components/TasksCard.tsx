import { Fragment, useState } from 'react';

// UI Components
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';

// Icons
import FastForwardIcon from '@mui/icons-material/FastForward';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// Hooks and Functions
import { useTheme } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectTeam } from '../../team/teamSlice';

// Data and Types
import { Rating, Task, TaskTypes } from '../../../types/data.types';
import { deleteTask, updateTask } from '../tasksSlice';
import TaskTableInfo from './sub/TaskTableInfo';
import SMDialog from '../../../components/dialogs/SMDialog';

// ---------------------

type TasksCardProps = {
  task: Task;
};

const taskTypeUIStyles = (type: TaskTypes) => {
  switch (type) {
    case 'todo':
      return {
        color: 'secondary3',
        addMembers: true,
      };
    case 'progress':
      return {
        color: 'secondary2',
        addMembers: true,
      };
    case 'done':
      return {
        color: 'secondary',
        addMembers: false,
      };
  }
};

function TasksCard({ task }: TasksCardProps) {
  const team = useAppSelector(selectTeam);
  // const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();
  const { palette } = useTheme();
  const { color, addMembers } = taskTypeUIStyles(task.type);

  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  /**
   * Making action to task according to its type
   * todo: Forward it to progress task
   * progress: Mark the task as completed
   * done: delete the task
   *
   * @param taskType type of the task (todo | progress | done)
   */
  const handleTaskAction = (taskType: TaskTypes) => {
    const taskCopy = { ...task };
    switch (taskType) {
      case 'todo':
        taskCopy.startingTime = Date.now();
        taskCopy.type = 'progress';

        dispatch(updateTask(taskCopy));
        break;
      case 'progress':
        taskCopy.endingTime = Date.now();
        const timeTaken = Date.now() - (taskCopy?.startingTime || 0);
        const differenceTime = timeTaken - taskCopy.estimatedTime * 1000;

        if (Math.abs(differenceTime) < 21_600) {
          taskCopy.rating = Rating.onSchedule;
        } else if (differenceTime > 21_600) {
          taskCopy.rating = Rating.behindSchedule;
        } else if (-differenceTime > 21_600) {
          taskCopy.rating = Rating.aheadOfSchedule;
        }
        taskCopy.type = 'done';

        dispatch(updateTask(taskCopy));
        break;
      case 'done':
        dispatch(deleteTask(task));
        break;
    }
  };

  /**
   * Toggeling addition info for a task
   * such as: estimated time and starting time
   */
  const handleOpenDetails = () => {
    setOpenDetails(!openDetails);
  };

  /**
   * Opening new dialog where to add and remove users for the given task
   */
  const handleAddDevsDialog = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <Box
        sx={{
          p: 2,
          mb: 2,
          borderRadius: '10px',
          bgcolor:
            palette.mode === 'light'
              ? palette[color]?.light
              : palette[color]?.dark,
        }}>
        {/* Task title and action Button */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pb={2}>
          <Typography variant="h5">{task.title}</Typography>
          <Tooltip
            title={
              task.type === 'todo'
                ? 'forward to progress'
                : task.type === 'progress'
                ? 'mark as completed'
                : 'delete the task'
            }
            TransitionComponent={Zoom}>
            <IconButton onClick={() => handleTaskAction(task.type)}>
              {task.type === 'todo' ? (
                <FastForwardIcon />
              ) : task.type === 'progress' ? (
                <CheckCircleIcon />
              ) : (
                <DeleteIcon />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
        {/* Task Description */}
        <Typography variant="body2" color="text.secondary" pb={2}>
          {task.description}
        </Typography>
        {/* Developers team and addition info button action */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <AvatarGroup>
            <AvatarGroup max={3}>
              {task.developers.map((devId, i) => {
                const dev = team.find((member) => member.id === devId);
                return dev ? (
                  <Avatar key={`dev-${i}`} src={dev.image} alt={dev.name} />
                ) : (
                  <Fragment key={`dev-${i}`}></Fragment>
                );
              })}
            </AvatarGroup>
            {addMembers && (
              <Avatar sx={{ bgcolor: 'background.default' }}>
                <IconButton onClick={handleAddDevsDialog}>
                  <AddIcon />
                </IconButton>
              </Avatar>
            )}
          </AvatarGroup>
          <IconButton onClick={handleOpenDetails}>
            {openDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Box>
        {/* Addition info  */}
        <Collapse in={openDetails}>
          <TaskTableInfo
            task={{ ...task, title: '', description: '', developers: [] }}
          />
        </Collapse>
      </Box>
      {/* Dialoge for adding devolopers to a given task */}
      {openDialog && (
        <SMDialog
          taskId={task.id}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          dialogType={task.type}
          dialogAction={'add-devs'}
        />
      )}
    </>
  );
}

export default TasksCard;
