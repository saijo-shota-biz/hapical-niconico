import { Add } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { VFC } from 'react';

type Props = {
  onClick: () => void;
};

export const FloatingButton: VFC<Props> = ({ onClick }) => {
  return (
    <Fab color="primary" size={'medium'} sx={{ position: 'absolute', bottom: '32px', right: '32px' }} onClick={onClick}>
      <Add />
    </Fab>
  );
};
