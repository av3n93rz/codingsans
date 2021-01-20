import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fb0',
    },
    secondary: {
      main: '#18374f',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  breakpoints: {
    values: {
      xs: 460,
      sm: 600,
      md: 800,
      lg: 1176,
      xl: 1644,
    },
  },
});

export default theme;
