import { Typography, TypographyProps } from '@mui/material';
import { VFC } from 'react';

type Props = Omit<TypographyProps, 'variant'> & {
  size?: 'sm' | 'md' | 'lg';
  bold?: boolean;
};

export const Label: VFC<Props> = ({ children, size = 'md', bold, ...rest }) => {
  return (
    <Typography variant={`label-${size}`} fontWeight={bold ? 'bold' : 'normal'} {...rest}>
      {children}
    </Typography>
  );
};
