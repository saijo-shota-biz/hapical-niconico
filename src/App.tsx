import { FirebaseAuthProvider } from '@function/FirebaseAuthProvider';
import { RoutesProvider } from '@function/RoutesProvider';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Toaster } from '@ui/utils/Toaster';
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
          <FirebaseAuthProvider />
          <RoutesProvider />
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
