import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

const white = '#ffffff';
const black = '#000000';

export const theme = createTheme({
  typography: {
    fontFamily: ['Noto Sans JP', 'Roboto', 'sans-serif'].join(',') + ' !important',
  },
  palette: {
    common: {
      white,
      black,
    },
    text: {
      primary: black,
      disabled: grey['300'],
    },
    background: {
      default: grey['50'],
    },
  },
});
