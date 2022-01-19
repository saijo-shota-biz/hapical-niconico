import { CardActions as MuiCardActions, CardActionsProps } from '@mui/material';
import { Spacer } from '@ui/utils/Spacer';
import { VFC } from 'react';

type Props = CardActionsProps;

export const CardActions: VFC<Props> = ({ children, sx, ...rest }) => {
  return (
    <MuiCardActions
      sx={{
        display: 'flex',
        padding: 3,
        borderTop: 'solid 1px',
        borderTopColor: 'grey.100',
        backgroundColor: 'grey.50',
        ...sx,
      }}
      {...rest}
    >
      <Spacer />
      {children}
    </MuiCardActions>
  );
};
