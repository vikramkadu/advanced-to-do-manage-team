import { useState } from 'react';

// UI Components
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import SMButton from '../elements/SMButton';
import SMDialog from '../dialogs/SMDialog';

// Icons
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// Hooks and Functions
import { useTheme } from '@mui/system';

// Data and Types
import logo from '../../assets/logo.jpg';

// --------------------------------

type NavbarProp = {
  mode: 'light' | 'dark';
  setMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
};

function Navbar({ mode, setMode }: NavbarProp) {
  const theme = useTheme();
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  /**
   * Changing theme in localstoraage and mode state to either dar or light
   */
  const handleThemeSwitch = () => {
    localStorage.setItem('theme', mode === 'light' ? 'dark' : 'light');
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  /**
   * Toggeling mobile menu search bar and add new task btn
   */
  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  /**
   * Toggeling Dialog for adding new Task
   */
  const handleClickAddTask = () => {
    setOpenDialog(true);
  };

  return (
    <>
      {/* Navigation Bar */}
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            py: 1,
          }}>
          {/* Logo + Heading Title */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Box
              component="img"
              sx={{
                dispaly: 'block',
                width: { sm: '70px', xs: '50px' },
                height: { sm: '70px', xs: '50px' },
                mr: 2,
              }}
              src={logo}
              alt="manage tasks"
            />
            <Stack direction="row" alignItems="baseline">
              <Typography variant="h2" pr={1}>
                Easy Manage
              </Typography>
              <Typography
                sx={{ display: { xs: 'none', md: 'block' } }}
                variant="h6"
                color="text.secondary">
                Current Project
              </Typography>
            </Stack>
          </Box>
          {/* Large Screen Display */}
          <Stack
            sx={{ display: { xs: 'none', md: 'flex' } }}
            direction="row"
            spacing={2}>
            <TextField
              id="search-input"
              sx={{
                borderRadius: '5px',
                bgcolor: theme.palette.background?.paper,
              }}
              size="small"
              hiddenLabel
              placeholder="search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <SMButton
              variant="light"
              sx={{ height: '40px' }}
              startIcon={<AddIcon />}
              onClick={handleClickAddTask}>
              Add new
            </SMButton>
            {/* Dark Mode switch */}
            <SMButton
              variant="light"
              color="secondary"
              iconOnly={true}
              size="medium"
              sx={{ width: '40px', height: '40px', borderRadius: '5px' }}
              onClick={handleThemeSwitch}>
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </SMButton>
          </Stack>
          {/* Small Screen Display menu buton and theme switcher */}
          <Box
            data-testid="menuNavBtns"
            sx={{
              display: { xs: 'block', md: 'none' },
            }}>
            <SMButton
              variant="light"
              color="secondary"
              iconOnly={true}
              size="medium"
              sx={{ width: '40px', height: '40px', borderRadius: '5px', mr: 1 }}
              onClick={handleThemeSwitch}>
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </SMButton>
            <IconButton onClick={handleMobileMenu}>
              {mobileMenu ? (
                <CloseIcon fontSize="medium" />
              ) : (
                <MenuIcon fontSize="medium" />
              )}
            </IconButton>
          </Box>
        </Box>
        {/* Small Screen Display Nav Elements */}
        <Collapse sx={{ width: '100%' }} in={mobileMenu}>
          <Paper elevation={5} sx={{ p: 2 }}>
            <Typography variant="h6" color="text.secondary" pb={1}>
              Current Project
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
              }}>
              <TextField
                id="search-input"
                sx={{
                  flexGrow: 1,
                  mr: { sm: 1 },
                  mb: { xs: 1, sm: 0 },
                  borderRadius: '5px',
                  bgcolor: theme.palette.background?.paper,
                }}
                size="small"
                hiddenLabel
                placeholder="search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              <SMButton
                variant="light"
                sx={{ height: '40px', width: { xs: '100%', sm: 'unset' } }}
                startIcon={<AddIcon />}
                onClick={handleClickAddTask}>
                Add new
              </SMButton>
            </Box>
          </Paper>
        </Collapse>
      </Toolbar>
      {/* Dialoge for adding new tasks */}
      {openDialog && (
        <SMDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          dialogType={'todo'}
          dialogAction={'add'}
        />
      )}
    </>
  );
}

export default Navbar;
