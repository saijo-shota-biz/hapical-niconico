import { Box, CircularProgress, CircularProgressProps } from '@mui/material';
import { VFC } from 'react';

type Props = CircularProgressProps;

export const Loading: VFC<Props> = ({ ...rest }) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress {...rest} />
    </Box>
  );
};
