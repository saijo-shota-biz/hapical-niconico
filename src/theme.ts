import { createTheme } from '@mui/material';
import { amber, blueGrey, grey, lightBlue, red } from '@mui/material/colors';
import { CSSProperties } from 'react';

const white = '#ffffff';
const black = '#000000';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    'label-sm': CSSProperties;
    'label-md': CSSProperties;
    'label-lg': CSSProperties;
    'description-sm': CSSProperties;
    'description-md': CSSProperties;
    'description-lg': CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    'label-sm'?: CSSProperties;
    'label-md'?: CSSProperties;
    'label-lg'?: CSSProperties;
    'description-sm'?: CSSProperties;
    'description-md'?: CSSProperties;
    'description-lg'?: CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'label-sm': true;
    'label-md': true;
    'label-lg': true;
    'description-sm': true;
    'description-md': true;
    'description-lg': true;
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    subtitle1: false;
    subtitle2: false;
    body1: false;
    body2: false;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: ['Noto Sans JP', 'Roboto', 'sans-serif'].join(',') + ' !important',
    'label-sm': {
      fontSize: '14px',
      lineHeight: '14px',
      fontWeight: 'normal',
    },
    'label-md': {
      fontSize: '16px',
      lineHeight: '16px',
      fontWeight: 'normal',
    },
    'label-lg': {
      fontSize: '18px',
      lineHeight: '18px',
      fontWeight: 'normal',
    },
    'description-sm': {
      fontSize: '14px',
      lineHeight: '21px',
      fontWeight: 'normal',
    },
    'description-md': {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 'normal',
    },
    'description-lg': {
      fontSize: '18px',
      lineHeight: '27px',
      fontWeight: 'normal',
    },
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
    neutral: blueGrey,
    primary: {
      ...lightBlue,
      contrastText: white,
    },
    secondary: amber,
    error: red,
    background: {
      default: grey['50'],
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}
declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsColorOverrides {
    neutral: true;
  }
}
