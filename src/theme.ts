'use client';
import { Poppins } from 'next/font/google';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#0070FF',
      paleBlue: '#DAF6FF',
    },
    secondary: {
      main: '#F99B20',
    },
    common: {
      white: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
    fontSize: 12,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

declare module '@mui/material/styles' {
  interface PaletteColor {
    paleBlue?: string;
  }

  interface SimplePaletteColorOptions {
    paleBlue?: string;
  }
}

export default responsiveFontSizes(theme);
