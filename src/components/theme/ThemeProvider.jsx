import React from 'react';
import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  responsiveFontSizes,
  createMuiTheme,
} from '@material-ui/core';

const theme = responsiveFontSizes(
  createMuiTheme({
    overrides: {
      MuiButton: {
        root: {
          textTransform: 'capitalize',
        },
      },
    },
    props: {
      MuiButtonBase: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      MuiButton: {
        disableElevation: true,
      },
    },
  })
);

function ThemeProvider({children}) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
