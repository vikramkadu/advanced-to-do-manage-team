import React, { useEffect } from 'react';

// UI Components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// Hooks and Functions
import { useAppSelector } from '../../../app/hooks';
import { selectTasks } from '../../../features/tasks/tasksSlice';

// Data and Types
import { Task, TaskTypes } from '../../../types/data.types';

// ---------------------

type EditTaskProps = {
  tasksType: TaskTypes;
  dialogAction: string;
  taskId: string;
  setTaskId: React.Dispatch<React.SetStateAction<string>>;
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
};

function UpdateTasks({
  tasksType,
  dialogAction,
  taskId,
  setTaskId,
  task,
  setTask,
}: EditTaskProps) {
  const tasks = useAppSelector(selectTasks).filter(
    (task: Task) => task.type === tasksType
  );

  /**
   * Update taskID and get the new task details
   *
   * @param event event listener changer of combobox
   */
  const handleSelectChange = (event: SelectChangeEvent) => {
    setTaskId(event.target.value as string);
    if (dialogAction !== 'add') {
      setTask(
        tasks.find((task) => task?.id === event.target.value) || tasks[0]
      );
    }
  };

  useEffect(() => {
    if (dialogAction === 'add') {
      setTask((prevTask: Task) => ({ ...prevTask, id: taskId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTask]);

  /**
   * change task data when changing input value
   *
   * @param e event of HTML Element
   * @param key the key of task object to be modified
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    let tempValue: string = e.target.value;
    let value: string | number = tempValue;

    // Check if there is an invalid inpur for the number of days
    // such as: '' or too big number
    if (key === 'estimatedTime') {
      if (+tempValue > 200 || tempValue === '' || tempValue === '0') {
        alert('YOU HAVE ENTERED AN INVALID DATE');
        return;
      }
    }

    // When changing time make the change by days to be in seconds as we store the value in seconds
    // and the user change the values by days
    if (key === 'estimatedTime') {
      value = parseInt(tempValue) * 86_400;
    }

    setTask((prevTask: Task) => ({ ...prevTask, [key]: value }));
  };

  return (
    <Box>
      {/* Selecting task ID to be Edited or ID generated for new task */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="task-type-select">Task ID</InputLabel>
        <Select
          labelId="select-task-id"
          id="select-task"
          value={task.id}
          readOnly={dialogAction === 'add'}
          label="Task ID"
          onChange={dialogAction === 'edit' ? handleSelectChange : undefined}>
          {dialogAction === 'edit' ? (
            tasks.map((task) => (
              <MenuItem value={task.id} key={task.id}>
                {task.id}
              </MenuItem>
            ))
          ) : (
            <MenuItem value={taskId}>{taskId}</MenuItem>
          )}
        </Select>
      </FormControl>
      {/* Task Information with the apility to modify it */}
      {task && (
        <Box>
          <TextField
            id="edit-task-title"
            variant="outlined"
            label="task title"
            fullWidth
            margin="normal"
            value={task.title}
            onChange={(e) => handleInputChange(e, 'title')}
          />
          <TextField
            id="edit-task-description"
            variant="outlined"
            label="task description"
            value={task.description}
            multiline
            maxRows={3}
            fullWidth
            margin="normal"
            onChange={(e) => handleInputChange(e, 'description')}
          />
          <TextField
            id="edit-task-estimated"
            type="number"
            inputProps={{ min: 1, max: 100 }}
            variant="outlined"
            label="estimated time (days)"
            fullWidth
            margin="normal"
            value={task.estimatedTime / 86_400} // change the value from seconds to days
            onChange={(e) => handleInputChange(e, 'estimatedTime')}
          />
        </Box>
      )}
    </Box>
  );
}

export default UpdateTasks;
