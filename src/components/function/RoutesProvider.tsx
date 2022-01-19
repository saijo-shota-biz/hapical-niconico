import { SecurityPage } from '@function/SecurityPage';
import { HomePage } from '@page/HomePage';
import { PasswordResetPage } from '@page/PasswordResetPage';
import { SignupPage } from '@page/SignupPage';
import { SinginPage } from '@page/SinginPage';
import { Layout } from '@ui/Layout';
import { VFC } from 'react';
import { Route, Routes } from 'react-router-dom';

export const RoutesProvider: VFC = () => {
  return (
    <Routes>
      <Route element={<SecurityPage />}>
        <Route element={<Layout />}>
          <Route path={'/'} element={<HomePage />} />
        </Route>
      </Route>

      <Route path={'/signin'} element={<SinginPage />} />
      <Route path={'/signup'} element={<SignupPage />} />
      <Route path={'/password-reset'} element={<PasswordResetPage />} />
    </Routes>
  );
};
