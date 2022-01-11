import { RoutesProvider } from '@function/RoutesProvider';
import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { theme } from '@/theme';

import './firebase';

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <RoutesProvider />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
