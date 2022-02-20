import { Add } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { VFC } from 'react';

type Props = {
  onClick: () => void;
};

export const FloatingButton: VFC<Props> = ({ onClick }) => {
  return (
    <Fab
      color="primary"
      size={'medium'}
      sx={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 9 }}
      onClick={onClick}
    >
      <Add />
    </Fab>
  );
};
