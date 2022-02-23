import { Card as MuiCard, CardProps, useMediaQuery } from '@mui/material';
import { ForwardedRef, forwardRef, VFC } from 'react';

type Props = CardProps & {
  forwardRef?: ForwardedRef<HTMLDivElement>;
};

export const ModalCard = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const smartPhone = useMediaQuery('(max-width:600px)');
  return <Card forwardRef={ref} {...props} sx={{ ...props.sx, width: smartPhone ? '90%' : '60%' }} />;
});

export const Card: VFC<Props> = ({ children, forwardRef, sx, ...rest }) => {
  return (
    <MuiCard sx={{ padding: 0, ...sx }} ref={forwardRef} {...rest}>
      {children}
    </MuiCard>
  );
};
