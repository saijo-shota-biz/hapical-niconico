import { Card as MuiCard, CardProps } from '@mui/material';
import { ForwardedRef, VFC } from 'react';

type Props = CardProps & {
  forwardRef?: ForwardedRef<HTMLDivElement>;
};

export const Card: VFC<Props> = ({ children, forwardRef, sx, ...rest }) => {
  return (
    <MuiCard sx={{ padding: 0, ...sx }} ref={forwardRef} {...rest}>
      {children}
    </MuiCard>
  );
};
