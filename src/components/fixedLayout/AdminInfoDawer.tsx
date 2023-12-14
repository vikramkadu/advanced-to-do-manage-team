import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

// UI Components
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Hooks and Functions
import { useTheme } from '@mui/system';
import { useAppSelector } from '../../app/hooks';
import { selectProgress } from '../../features/tasks/tasksSlice';

// --------------------------------

type AdminInfoDawerProps = {
  closeBtnVisibility: boolean;
  setOpenAdminInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

function AdminInfoDawer({
  closeBtnVisibility,
  setOpenAdminInfo,
}: AdminInfoDawerProps) {
  const progress = useAppSelector(selectProgress);

  const theme = useTheme();
  const mainColor = theme.palette.primary?.main;
  const [value, setValue] = useState<Dayjs | null>(
    dayjs(Date.now() + 84_000_000 * 10)
  );

  /**
   * Closing Admin Information Drawer
   */
  const handleOpenAdminInfo = () => {
    setOpenAdminInfo(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      p={2}
      pt={3}>
      {/* Buttons in action (notification + close button) */}
      <Stack direction="row" width="100%" justifyContent="space-between">
        {closeBtnVisibility ? (
          <IconButton onClick={handleOpenAdminInfo}>
            <CloseIcon />
          </IconButton>
        ) : (
          <Box></Box>
        )}
        <IconButton>
          <Badge color="primary" variant="dot">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Stack>
      {/* Admin Image */}
      <Box
        sx={{
          p: 1,
          mt: 3,
          mb: 2,
          border: `2px dashed ${mainColor}`,
          borderRadius: '50%',
        }}>
        <Avatar
          sx={{
            width: '100px',
            height: '100px',
          }}
          src="https://res.cloudinary.com/availablecoder/image/upload/v1674989138/easy-manage/admin.png"
          alt="admin image"
        />
      </Box>
      {/* Admin username */}
      <Typography variant="subtitle1" color="GrayText" pb={1}>
        @availablecoder
      </Typography>
      {/* Admin Name */}
      <Typography variant="h4">Ahmed Mohamed</Typography>
      {/* Progress percentage */}
      <Typography variant="h6" color="GrayText" mt={2}>
        Your Progress ...
      </Typography>
      <Typography component="span" fontSize="70px" fontWeight={700} mb={2}>
        {progress.toString().length > 4 ? progress.toPrecision(2) : progress}%
      </Typography>

      {/* Project Ending Date */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DatePicker
            // disableFuture
            label="Project Ending Date"
            minDate={dayjs(Date.now())}
            maxDate={dayjs(Date.now() + 84_000_000 * 365)}
            openTo="day"
            views={['day']}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </Box>
  );
}

export default AdminInfoDawer;
