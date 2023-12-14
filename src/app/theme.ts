import createTheme, { Theme } from '@mui/material/styles/createTheme';
import green from '@mui/material/colors/green';

// Light theme
export const lightTheme: Theme = createTheme({
  components: {
    MuiButton: {},
  },
  palette: {
    mode: 'light',
    primary: {
      main: green['700'],
    },
    secondary: {
      main: '#651fff',
      light: '#D6C8F6',
      dark: '#280080',
      contrastText: '#000',
    },
    secondary2: {
      main: '#00bcd4',
      light: '#D5F3F6',
      dark: '#005a66',
      contrastText: '#000',
    },
    secondary3: {
      main: '#ffc107',
      light: '#FEF4C3',
      dark: '#997300',
      contrastText: '#000',
    },
    background: {
      default: '#F9FBFC',
      paper: '#ffffff',
    },
  },
  typography: {
    allVariants: {
      textTransform: 'none',
      fontFamily: 'Montserrat, sans-serif',
    },
    h1: {
      fontSize: '40px',
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '35px',
      },
    },
    h2: {
      fontSize: '30px',
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '20px',
      },
    },
    h3: {
      fontSize: '23px',
    },
    h4: {
      fontSize: '20px',
      fontWeight: 500,
    },
    h5: {
      fontSize: '18px',
      fontWeight: 500,
    },
    h6: {
      fontSize: '16px',
      fontWeight: 700,
    },
    body2: {
      fontSize: '14px',
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '13px',
      fontWeight: 500,
    },
  },
});

// Dark theme
export const darkTheme: Theme = createTheme({
  components: {
    MuiButton: {},
  },
  palette: {
    mode: 'dark',
    primary: {
      main: green['700'],
    },
    secondary: {
      main: '#651fff',
      light: '#D6C8F6',
      dark: '#280080',
      contrastText: '#000',
    },
    secondary2: {
      main: '#00bcd4',
      light: '#D5F3F6',
      dark: '#005a66',
      contrastText: '#000',
    },
    secondary3: {
      main: '#ffc107',
      light: '#FEF4C3',
      dark: '#997300',
      contrastText: '#000',
    },
    background: {
      paper: '#000000',
    },
  },
  typography: {
    allVariants: {
      textTransform: 'none',
      fontFamily: 'Montserrat, sans-serif',
    },
    h1: {
      fontSize: '40px',
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '35px',
      },
    },
    h2: {
      fontSize: '30px',
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '20px',
      },
    },
    h3: {
      fontSize: '23px',
    },
    h4: {
      fontSize: '20px',
      fontWeight: 500,
    },
    h5: {
      fontSize: '18px',
      fontWeight: 500,
    },
    h6: {
      fontSize: '16px',
      fontWeight: 700,
    },
    body2: {
      fontSize: '14px',
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '13px',
      fontWeight: 500,
    },
  },
});

// Adding new color Palettes type
declare module '@mui/material/styles' {
  interface Palette {
    secondary2: Palette['primary'];
    secondary3: Palette['primary'];
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    secondary2?: PaletteOptions['primary'];
    secondary3?: PaletteOptions['primary'];
  }
}

// Adding new color Palettes type to Our Button
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    secondary2: true;
    secondary3: true;
  }
}
