import { PublicPage } from '@function/PublicPage';
import { SecurityPage } from '@function/SecurityPage';
import { AccountPage } from '@page/AccountPage';
import { HomePage } from '@page/HomePage';
import { PasswordResetPage } from '@page/PasswordResetPage';
import { SignupPage } from '@page/SignupPage';
import { SinginPage } from '@page/SinginPage';
import { TeamListPage } from '@page/TeamListPage';
import { Layout } from '@ui/Layout';
import { VFC } from 'react';
import { Route, Routes } from 'react-router-dom';

export const RoutesProvider: VFC = () => {
  return (
    <Routes>
      <Route element={<SecurityPage />}>
        <Route element={<Layout />}>
          <Route path={'/'} element={<HomePage />} />
          <Route path={'/team-list'} element={<TeamListPage />} />
          <Route path={'/account'} element={<AccountPage />} />
        </Route>
      </Route>

      <Route element={<PublicPage />}>
        <Route path={'/signin'} element={<SinginPage />} />
        <Route path={'/signup'} element={<SignupPage />} />
        <Route path={'/password-reset'} element={<PasswordResetPage />} />
      </Route>
    </Routes>
  );
};
