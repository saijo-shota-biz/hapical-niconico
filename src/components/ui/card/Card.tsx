import { Card as MuiCard, CardProps } from '@mui/material';
import { VFC } from 'react';

type Props = CardProps;

export const Card: VFC<Props> = ({ children, sx, ...rest }) => {
  return (
    <MuiCard sx={{ padding: 0, ...sx }} {...rest}>
      {children}
    </MuiCard>
  );
};
