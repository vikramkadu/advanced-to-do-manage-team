// UI Components
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

// Icons
import FitbitIcon from '@mui/icons-material/Fitbit';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SMButton from '../elements/SMButton';
import { Link } from 'react-router-dom';

// --------------------------------

type NavigatorDrawerNavbarProps = {
  openAdminInfo: boolean;
  setOpenAdminInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

function NavigatorDrawer({
  openAdminInfo,
  setOpenAdminInfo,
}: NavigatorDrawerNavbarProps) {
  /**
   * Toggeling admin info page by clicking admin button in the nav drawer
   */
  const handleAdminInfo = () => {
    setOpenAdminInfo(!openAdminInfo);
  };

  return (
    <div>
      {/* Nav Links */}
      <List sx={{ px: 1.5 }}>
        {/* Logo to home page */}
        <ListItem sx={{ mb: 4, p: 0, ml: '-4px' }}>
          <Tooltip
            title="home page"
            placement="right"
            TransitionComponent={Zoom}>
            <SMButton variant="text" iconOnly>
              <FitbitIcon sx={{ fontSize: '30px' }} />
            </SMButton>
          </Tooltip>
        </ListItem>
        <ListItem sx={{ mb: 1, p: 0 }}>
          <Tooltip
            title="dashboard"
            placement="right"
            TransitionComponent={Zoom}>
            <SMButton variant="text" iconOnly>
              <DashboardIcon />
            </SMButton>
          </Tooltip>
        </ListItem>
        <ListItem sx={{ mb: 1, p: 0 }}>
          <Tooltip title="tasks" placement="right" TransitionComponent={Zoom}>
            <SMButton variant="text" iconOnly>
              <CheckBoxIcon />
            </SMButton>
          </Tooltip>
        </ListItem>
        <ListItem sx={{ mb: 1, p: 0 }}>
          <Tooltip title="users" placement="right" TransitionComponent={Zoom}>
            <SMButton variant="text" iconOnly >
              <PersonIcon />
            </SMButton>
          </Tooltip>
        </ListItem>
        <ListItem sx={{ mb: 1, p: 0 }}>
          <Tooltip
            title="messages"
            placement="right"
            TransitionComponent={Zoom}>
            <SMButton variant="text" iconOnly>
              <ChatBubbleIcon />
            </SMButton>
          </Tooltip>
        </ListItem>
        <ListItem sx={{ mb: 1, p: 0 }}>
          <Tooltip
            title="settings"
            placement="right"
            TransitionComponent={Zoom}>
            <SMButton variant="text" iconOnly>
              <SettingsIcon />
            </SMButton>
          </Tooltip>
        </ListItem>
      </List>
      {/* Nav Foot Links */}
      <List sx={{ px: 1.5, position: 'absolute', bottom: 0 }}>
        <ListItem sx={{ mb: 1, p: 0 }}>
          <Tooltip
            title="admin info"
            placement="right"
            TransitionComponent={Zoom}>
            <IconButton sx={{ p: 0, mb: 1 }} onClick={handleAdminInfo}>
              <Avatar
                src="https://res.cloudinary.com/availablecoder/image/upload/v1674989138/easy-manage/admin.png"
                alt="admin"
              />
            </IconButton>
          </Tooltip>
        </ListItem>
        <ListItem sx={{ mb: 1, p: 0 }}>
          <Tooltip
            title="add member"
            placement="right"
            TransitionComponent={Zoom}>
            <SMButton variant="text" iconOnly>
              <GroupAddIcon />
            </SMButton>
          </Tooltip>
        </ListItem>
        <ListItem disablePadding>
          <Tooltip title="return" placement="right" TransitionComponent={Zoom}>
            <SMButton variant="text" iconOnly>
              <AssignmentReturnIcon />
            </SMButton>
          </Tooltip>
        </ListItem>
      </List>
    </div>
  );
}

export default NavigatorDrawer;
