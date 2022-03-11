import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#ff9800',
      },
      secondary: {
        main: '#ff9800',
      },
      success: {
        main: '#009688',
      },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '4.5rem',
            fontWeight: '300',
            lineHeight: '1.2',
            '@media (max-width:800px)': {
                fontSize: '3.5rem',
              },
        },
        h2: {
            fontSize: '4.5rem',
            fontWeight: '300',
            lineHeight: '1.2',
            '@media (max-width:800px)': {
                fontSize: '2.5rem',
              },
        },
    }
  });

export default theme;