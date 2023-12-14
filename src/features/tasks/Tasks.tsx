import React, { useEffect, useState } from 'react';

// UI Components
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SMDialog from '../../components/dialogs/SMDialog';

import TodoHead from './components/TasksHead';
import TasksCard from './components/TasksCard';

// Icons
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateIcon from '@mui/icons-material/Create';

// Hooks and Functions
import { useAppSelector } from '../../app/hooks';
import { useTheme } from '@mui/system';
import { selectTasks } from './tasksSlice';

// Data and Types
import { TaskTypes } from '../../types/data.types';

// --------------

function Tasks() {
  const { breakpoints } = useTheme();
  const tasks = useAppSelector(selectTasks);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<string>('1');
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<TaskTypes>('todo');
  const [dialogAction, setDialogAction] = useState<string>('');

  /**
   * Tabs changing value for mobile view of tasks
   *
   * @param _e Event listener for changing taps value
   * @param newValue new tab value (tab page to be shown)
   */
  const handleTapChange = (_e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  const open = Boolean(anchorEl);
  /**
   * Showing popup menu when clicking on Icon Button and saving tasks type that we will form action on it
   * edit: open Edit tasks dialog for the tasks type chosen
   * copy: open Delete tasks dialog for the tasks type chosen
   *
   * @param e Mouse Event (Clicking)
   * @param tasksType type of tasks to be shown
   */
  const handleMenuOpen = (
    e: React.MouseEvent<HTMLElement>,
    tasksType: TaskTypes
  ) => {
    setAnchorEl(e.currentTarget);
    setDialogType(tasksType);
  };

  /**
   * Closing popup menu when there is no anchor on the button
   */
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  console.log('tasks',tasks)


  /**
   * Opening dialog box for making different actions on our tasks
   * edit: edit tasks action
   * copy: not implemented yet
   * delete: delete tasks action
   *
   * NOTE: we knew taskstype when we first click the Icon button and showed the menu popup
   *
   * @param actionClicked button clicked from the button in the popup menu
   */
  const handleDialogOpen = (actionClicked: string) => {
    switch (actionClicked) {
      case 'edit':
        setDialogAction('edit');
        setOpenDialog(true);
        handleMenuClose();
        break;
      case 'delete':
        setDialogAction('delete');
        setOpenDialog(true);
        handleMenuClose();
        break;
      case 'copy':
        setDialogAction('edit');
        break;
    }
  };

  // Checking for window width to change view
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);

    // remove the event Listener to prevent conflect between events
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return (
    <>
      {/* Desktop View */}
      {windowWidth >= breakpoints.values.md && (
        <Grid container spacing={2}>
          {/* Todo Tasks */}
          <Grid item xs={4}>
            <TodoHead taskType="todo" />
            <Paper
              sx={{
                borderRadius: '0px 0px 10px 10px',
                p: 1,
              }}
              elevation={0}>
              {tasks.filter((task) => task.type === 'todo').length > 0 ? (
                <Stack direction="row" justifyContent="space-between" py={1}>
                  <Typography variant="subtitle1" pl={1} color="GrayText">
                    {tasks.filter((task) => task.type === 'todo').length} Tasks
                  </Typography>
                  <Tooltip title="Edit Tasks" TransitionComponent={Zoom}>
                    <IconButton
                      onClick={(e: React.MouseEvent<HTMLElement>) =>
                        handleMenuOpen(e, 'todo')
                      }
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'edit tasks' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}>
                      <MoreHorizIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              ) : (
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography textAlign="center" pr={1}>
                    No Tasks
                  </Typography>
                  <CreateIcon />
                </Box>
              )}
              {tasks
                .filter((task) => task.type === 'todo')
                .map((task) => (
                  <TasksCard key={task.id} task={task} />
                ))}
            </Paper>
          </Grid>
          {/* Progress Tasks */}
          <Grid item xs={4}>
            <TodoHead taskType="progress" />
            <Paper
              sx={{
                borderRadius: '0px 0px 10px 10px',
                p: 1,
              }}
              elevation={0}>
              {tasks.filter((task) => task.type === 'progress').length > 0 ? (
                <Stack direction="row" justifyContent="space-between" py={1}>
                  <Typography variant="subtitle1" pl={1} color="GrayText">
                    {tasks.filter((task) => task.type === 'progress').length}{' '}
                    Tasks
                  </Typography>
                  <Tooltip title="Edit Tasks" TransitionComponent={Zoom}>
                    <IconButton
                      onClick={(e: React.MouseEvent<HTMLElement>) =>
                        handleMenuOpen(e, 'progress')
                      }
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}>
                      <MoreHorizIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              ) : (
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography textAlign="center" pr={1}>
                    No Tasks
                  </Typography>
                  <CreateIcon />
                </Box>
              )}
              {tasks
                .filter((task) => task.type === 'progress')
                .map((task) => (
                  <TasksCard key={task.id} task={task} />
                ))}
            </Paper>
          </Grid>
          {/* Done Tasks */}
          <Grid item xs={4}>
            <TodoHead taskType="done" />
            <Paper
              sx={{
                borderRadius: '0px 0px 10px 10px',
                p: 1,
                pt: 2,
              }}
              elevation={0}>
              {tasks.filter((task) => task.type === 'done').length === 0 && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mt={-1}>
                  <Typography textAlign="center" pr={1}>
                    No Tasks
                  </Typography>
                  <CreateIcon />
                </Box>
              )}
              {tasks
                .filter((task) => task.type === 'done')
                .map((task) => (
                  <TasksCard key={task.id} task={task} />
                ))}
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Mobile View */}
      {windowWidth < breakpoints.values.md && (
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleTapChange}
              aria-label="tasks fetched from API">
              <Tab label="Todo Tasks" value="1" />
              <Tab label="In progress" value="2" />
              <Tab label="Completed" value="3" />
            </TabList>
          </Box>
          {/* Todo Tasks */}
          <TabPanel value="1" sx={{ px: 1 }}>
            <TodoHead taskType="todo" />
            <Paper
              sx={{
                borderRadius: '0px 0px 10px 10px',
                p: 1,
              }}
              elevation={0}>
              {tasks.filter((task) => task.type === 'todo').length > 0 ? (
                <Stack direction="row" justifyContent="space-between" py={1}>
                  <Typography variant="subtitle1" pl={1} color="GrayText">
                    {tasks.filter((task) => task.type === 'todo').length} Tasks
                  </Typography>
                  <Tooltip title="Edit Tasks" TransitionComponent={Zoom}>
                    <IconButton
                      onClick={(e: React.MouseEvent<HTMLElement>) =>
                        handleMenuOpen(e, 'todo')
                      }
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'edit tasks' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}>
                      <MoreHorizIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              ) : (
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography textAlign="center" pr={1}>
                    No Tasks
                  </Typography>
                  <CreateIcon />
                </Box>
              )}
              {tasks
                .filter((task) => task.type === 'todo')
                .map((task) => (
                  <TasksCard key={task.id} task={task} />
                ))}
            </Paper>
          </TabPanel>
          {/* Progress Tasks */}
          <TabPanel value="2" sx={{ px: 1 }}>
            <TodoHead taskType="progress" />
            <Paper
              sx={{
                borderRadius: '0px 0px 10px 10px',
                p: 1,
              }}
              elevation={0}>
              {tasks.filter((task) => task.type === 'progress').length > 0 ? (
                <Stack direction="row" justifyContent="space-between" py={1}>
                  <Typography variant="subtitle1" pl={1} color="GrayText">
                    {tasks.filter((task) => task.type === 'progress').length}{' '}
                    Tasks
                  </Typography>
                  <Tooltip title="Edit Tasks" TransitionComponent={Zoom}>
                    <IconButton
                      onClick={(e: React.MouseEvent<HTMLElement>) =>
                        handleMenuOpen(e, 'progress')
                      }
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}>
                      <MoreHorizIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              ) : (
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography textAlign="center" pr={1}>
                    No Tasks
                  </Typography>
                  <CreateIcon />
                </Box>
              )}
              {tasks
                .filter((task) => task.type === 'progress')
                .map((task) => (
                  <TasksCard key={task.id} task={task} />
                ))}
            </Paper>
          </TabPanel>
          {/* Done Tasks */}
          <TabPanel value="3" sx={{ px: 1 }}>
            <TodoHead taskType="done" />
            <Paper
              sx={{
                borderRadius: '0px 0px 10px 10px',
                p: 1,
                pt: 2,
              }}
              elevation={0}>
              {tasks.filter((task) => task.type === 'done').length === 0 && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mt={-1}>
                  <Typography textAlign="center" pr={1}>
                    No Tasks
                  </Typography>
                  <CreateIcon />
                </Box>
              )}
              {tasks
                .filter((task) => task.type === 'done')
                .map((task) => (
                  <TasksCard key={task.id} task={task} />
                ))}
            </Paper>
          </TabPanel>
        </TabContext>
      )}

      {/* Popup menu on different action to tasks */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem onClick={() => handleDialogOpen('edit')}>
          <BorderColorIcon />
          &nbsp;&nbsp; Edit Task
        </MenuItem>
        <MenuItem onClick={() => handleDialogOpen('copy')}>
          <ContentCopyIcon />
          &nbsp;&nbsp; Copy Task
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleDialogOpen('delete')}>
          <DeleteOutlineIcon />
          &nbsp;&nbsp; Delete
        </MenuItem>
      </Menu>

      {/* Dialoge */}
      {openDialog && (
        <SMDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          dialogType={dialogType}
          dialogAction={dialogAction}
        />
      )}
    </>
  );
}

export default Tasks;
