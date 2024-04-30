import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDarkMode } from '../hooks/useDarkMode';

const useTheme = () => {
  const isDarkMode = useDarkMode();

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#3f51b5' : '#007FFF',
      },
      secondary: {
        main: isDarkMode ? '#f50057' : '#FF4081',
      },
      background: {
        default: isDarkMode ? '#282c34' : '#fafafa',
      },
    },
    direction: "rtl",
    typography: {
      fontFamily: ["sans-serif"].join(" "),
    },
  });

  return theme;
};

export default useTheme;