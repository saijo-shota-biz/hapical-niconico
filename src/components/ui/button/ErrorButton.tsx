import { AppButton, AppButtonProps } from '@ui/button/AppButton';
import { VFC } from 'react';

type Props = Omit<AppButtonProps, 'color' | 'variant'>;

export const ErrorButton: VFC<Props> = ({ children, ...rest }) => {
  return (
    <AppButton color={'error'} {...rest}>
      {children}
    </AppButton>
  );
};
