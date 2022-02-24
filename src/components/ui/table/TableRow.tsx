import { Box, SxProps } from '@mui/material';
import { ReactNode, VFC } from 'react';

type Props = {
  children: ReactNode;
  sx?: SxProps;
};

export const TableRow: VFC<Props> = ({ sx = {}, children }) => {
  return <Box sx={{ ...sx, display: 'table-row' }}>{children}</Box>;
};
