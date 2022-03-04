import { FirebaseAuthProvider } from '@function/FirebaseAuthProvider';
import { RoutesProvider } from '@function/RoutesProvider';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { ConfirmModal } from '@ui/modal/ConfirmModal';
import { Toaster } from '@ui/utils/Toaster';
import { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import './firebase';

import { theme as myTheme } from '@/theme';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => myTheme(prefersDarkMode ? 'dark' : 'light'), [prefersDarkMode]);

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <FirebaseAuthProvider />
          <RoutesProvider />
          <Toaster />
          <ConfirmModal />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
