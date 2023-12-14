// UI Components
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// Hooks and Functions
import { useAppSelector } from '../../../app/hooks';
import { selectTasks } from '../../../features/tasks/tasksSlice';

// Data and Types
import { Task, TaskTypes } from '../../../types/data.types';
import TaskTableInfo from '../../../features/tasks/components/sub/TaskTableInfo';

// --------------------------------

type DeleteTaskProps = {
  tasksType: TaskTypes;
  taskId: string;
  setTaskId: React.Dispatch<React.SetStateAction<string>>;
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
};

function DeleteTasks({
  tasksType,
  taskId,
  setTaskId,
  task,
  setTask,
}: DeleteTaskProps) {
  const tasks = useAppSelector(selectTasks).filter(
    (task: Task) => task.type === tasksType
  );

  /**
   * Change task data when choosing another task ID
   *
   * @param event Selecting event
   */
  const handleSelectChange = (event: SelectChangeEvent) => {
    setTaskId(event.target.value as string);
    setTask(tasks.find((task) => task?.id === event.target.value) || tasks[0]);
  };

  return (
    <Box>
      {/* Selecting Task */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="task-type-select">Task ID</InputLabel>
        <Select
          labelId="select-task-id"
          id="select-task"
          value={task.id}
          label="Task ID"
          onChange={handleSelectChange}>
          {tasks.map((task) => (
            <MenuItem value={task.id} key={task.id}>
              {task.id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Task information */}
      {task && (
        <Box>
          <TaskTableInfo task={task} />
        </Box>
      )}
    </Box>
  );
}

export default DeleteTasks;
