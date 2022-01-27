import { Button, ButtonProps } from '@mui/material';
import { Description } from '@ui/typography/Description';
import { VFC } from 'react';

export type AppButtonProps = Omit<ButtonProps, 'disableElevation'>;

export const AppButton: VFC<AppButtonProps> = ({ children, ...rest }) => {
  return (
    <Button color={'primary'} variant={'contained'} disableElevation {...rest}>
      <Description>{children}</Description>
    </Button>
  );
};
