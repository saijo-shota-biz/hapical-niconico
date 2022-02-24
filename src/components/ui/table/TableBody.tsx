import { Box, SxProps } from '@mui/material';
import { ReactNode, VFC } from 'react';

type Props = {
  children: ReactNode;
  sx?: SxProps;
};

export const TableBody: VFC<Props> = ({ sx = {}, children }) => {
  return <Box sx={{ ...sx, display: 'table-row-group' }}>{children}</Box>;
};
