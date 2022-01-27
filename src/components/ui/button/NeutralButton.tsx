import { AppButton, AppButtonProps } from '@ui/button/AppButton';
import { VFC } from 'react';

type Props = Omit<AppButtonProps, 'color' | 'variant'>;

export const NeutralButton: VFC<Props> = ({ children, ...rest }) => {
  return (
    <AppButton color={'neutral'} {...rest}>
      {children}
    </AppButton>
  );
};
