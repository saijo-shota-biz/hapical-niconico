import { CardContent as MuiCardContent, CardContentProps } from '@mui/material';
import { VFC } from 'react';

type Props = CardContentProps;

export const CardContent: VFC<Props> = ({ children, sx, ...rest }) => {
  return (
    <MuiCardContent sx={{ padding: 3 }} {...rest}>
      {children}
    </MuiCardContent>
  );
};
