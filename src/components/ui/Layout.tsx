import { VFC } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout: VFC = () => {
  return <Outlet />;
};
