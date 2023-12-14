import { useEffect, useRef, useState } from 'react';

// UI Component
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import EditTask from './dialogContent/UpdateTasks';
import DeleteTask from './dialogContent/DeleteTasks';
import AddDevs from './dialogContent/AddDevs';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Hooks and Functions
import { capitalizeString, idGenerator } from '../../utils/algorithms';

// Data and Types
import { Task, TaskTypes } from '../../types/data.types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addTask,
  deleteTask,
  selectTasks,
  updateTask,
} from '../../features/tasks/tasksSlice';

// -----------------------

type SMDialogProps = {
  taskId?: string;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  dialogType: TaskTypes;
  dialogAction: string;
};

/**
 * Dialog component to be used when needed
 *
 * @param dialogProps
 * @returns dialog window
 */
function SMDialog({
  openDialog,
  setOpenDialog,
  dialogType: tasksType,
  dialogAction,
  taskId: taskIdTemp,
}: SMDialogProps) {
  const dispatch = useAppDispatch();

  // Getting all tasks that matches with the type passed
  const tasks: Task[] = useAppSelector(selectTasks).filter(
    (task: Task) => task.type === tasksType
  );

  // Get the task if there is a taskId passed (in case of add developers for a given task)
  const tempTask: Task | undefined = useAppSelector(selectTasks).find(
    (task: Task) => task.id === taskIdTemp
  );

  // Set our task to the task if existed (in case of add developers) and make empty task if there isn't
  const [task, setTask] = useState<Task>(
    tempTask
      ? tempTask
      : {
          id: '',
          type: tasksType,
          title: '',
          description: '',
          developers: [],
          estimatedTime: 86_400,
        }
  );

  // set taskId for selecting different tasks in case of edit and delete
  const [taskId, setTaskId] = useState<string>(
    dialogAction === 'edit' || dialogAction === 'delete'
      ? tasks[0].id
      : idGenerator()
  );

  /**
   * Closing the dialog
   */
  const handleClose = () => {
    setOpenDialog(false);
  };

  /**
   * Action happened on clicking action button in the dialog footer
   */
  const handleClickAction = () => {
    if (task.title === '' || task.description === '' || task.id === '') {
      handleClose();
      return;
    }
    if (dialogAction === 'edit') dispatch(updateTask(task));
    if (dialogAction === 'add') dispatch(addTask(task));
    if (dialogAction === 'delete') dispatch(deleteTask(task));
    if (dialogAction === 'add-devs' && taskId !== undefined)
      dispatch(updateTask(task));

    handleClose();
  };

  /**
   * Focus on the element we where on it
   */
  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (openDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openDialog]);

  return (
    <div>
      <Dialog
        open={openDialog}
        fullWidth
        scroll={'paper'}
        aria-labelledby="tasks-dialog-title"
        aria-describedby="tasks-dialog-description">
        {/* Dialog Title */}
        <DialogTitle id="tasks-dialog-title">
          {capitalizeString(`${dialogAction} (${tasksType} tasks)`)}{' '}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {/* Dialog Content that will be changed according to (dialogType, dialogAction) Props */}
        <DialogContent dividers>
          {dialogAction === 'edit' || dialogAction === 'add' ? (
            <EditTask
              tasksType={tasksType}
              dialogAction={dialogAction}
              taskId={taskId}
              setTaskId={setTaskId}
              task={task}
              setTask={setTask}
            />
          ) : dialogAction === 'delete' ? (
            <DeleteTask
              tasksType={tasksType}
              taskId={taskId}
              setTaskId={setTaskId}
              task={task}
              setTask={setTask}
            />
          ) : dialogAction === 'add-devs' && taskId !== undefined ? (
            <AddDevs taskId={taskId} task={task} setTask={setTask} />
          ) : (
            <div>Test</div>
          )}
        </DialogContent>
        {/* Dialog footer where action will take place */}
        <DialogActions>
          <Button
            onClick={handleClickAction}
            variant="contained"
            color={dialogAction === 'delete' ? 'error' : 'primary'}>
            {capitalizeString(
              `${dialogAction} ${dialogAction !== 'add-devs' ? 'tasks' : ''}`
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SMDialog;
