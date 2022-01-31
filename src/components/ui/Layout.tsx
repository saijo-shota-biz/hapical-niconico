import { AppBar, Box, Toolbar } from '@mui/material';
import { ReactNode, useCallback, VFC } from 'react';

type Props = {
  children: ReactNode;
};

export const Layout: VFC<Props> = ({ children }) => {
  const filter = useCallback(
    (fn: (x: any) => boolean) =>
      children ? (Array.isArray(children) ? children.filter(fn) : [children].filter(fn)) : null,
    [children]
  );
  const header = filter((x) => x.key === 'header');
  const main = filter((x) => x.key === undefined || x.key === 'main');

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ display: 'flex' }}>{header}</Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, flexBasis: 0, display: 'flex', flexDirection: 'column' }}>{main}</Box>
    </>
  );
};
