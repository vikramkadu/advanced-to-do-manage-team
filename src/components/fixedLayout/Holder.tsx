import { ReactNode, useState } from 'react';

// UI Components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';

import Navbar from './Navbar';
import AdminInfoDawer from './AdminInfoDawer';
import NavigatorDrawer from './NavigatorDrawer';

// Hooks and functions
import { useTheme } from '@mui/system';

// --------------------------------

type HolderProp = {
  mode: 'light' | 'dark';
  setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  children: ReactNode;
};

const navDrawerWidth = 65;
const adminDrawerWidth = 300;

/**
 * The Holder component that has all the fixed components in the page including Nav links drawer, nav header and admin information drawer
 *
 * @param param0 {mode, setMode} for changing theme + {children} where the components will be renders in it
 * @returns All Fixed layouts in the page (Nav Links Drawer, nav header and admin drawer)
 */
function Holder({ mode, setMode, children }: HolderProp): JSX.Element {
  const theme = useTheme();

  const [openAdminInfo, setOpenAdminInfo] = useState<boolean>(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Bar */}

      <AppBar
        position="relative"
        color="transparent"
        elevation={0}
        sx={{
          width: {
            lg: `calc(100% - ${navDrawerWidth + adminDrawerWidth}px)`,
            xs: `calc(100% - ${navDrawerWidth}px)`,
          },
          ml: `${navDrawerWidth}px`,
          mr: { lg: `${adminDrawerWidth}px` },
        }}>
        <Navbar mode={mode} setMode={setMode} />
      </AppBar>
      {/* Left side Links Anchor */}
      <Drawer
        sx={{
          width: navDrawerWidth,
          position: 'relative',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            bgcolor: theme.palette.primary?.main,
            width: navDrawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left">
        <NavigatorDrawer
          openAdminInfo={openAdminInfo}
          setOpenAdminInfo={setOpenAdminInfo}
        />
      </Drawer>
      {/* Main Content  */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 1,
          width: {
            lg: `calc(100% - ${navDrawerWidth + adminDrawerWidth}px)`,
            xs: `calc(100% - ${navDrawerWidth}px)`,
          },
          ml: `${navDrawerWidth}px`,
          mr: { lg: `${adminDrawerWidth}px` },
        }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>

      {/* Right side Anchor (Personal Info) for permenant view for large screens  */}
      <Drawer
        sx={{
          display: { xs: 'none', lg: 'block' },
          width: adminDrawerWidth,
          position: 'relative',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: adminDrawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="right">
        <AdminInfoDawer
          closeBtnVisibility={false}
          setOpenAdminInfo={setOpenAdminInfo}
        />
      </Drawer>

      {/* Right side Anchor (Personal Info) for remporaly view for medium and small screens */}
      <Drawer
        sx={{
          display: { xs: 'block', lg: 'none' },
          width: adminDrawerWidth,
          position: 'relative',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            bgcolor: theme.palette.background?.paper,
            width: adminDrawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="temporary"
        anchor="right"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        open={openAdminInfo}
        onClose={() => setOpenAdminInfo(false)}>
        <AdminInfoDawer
          closeBtnVisibility={true}
          setOpenAdminInfo={setOpenAdminInfo}
        />
      </Drawer>
    </Box>
  );
}

export default Holder;
