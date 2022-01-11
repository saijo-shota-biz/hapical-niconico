import { HomePage } from '@page/HomePage';
import { SignupPage } from '@page/SignupPage';
import { SinginPage } from '@page/SinginPage';
import { VFC } from 'react';
import { Route, Routes } from 'react-router-dom';

export const RoutesProvider: VFC = () => {
  return (
    <Routes>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/signin'} element={<SinginPage />} />
      <Route path={'/signup'} element={<SignupPage />} />
    </Routes>
  );
};
