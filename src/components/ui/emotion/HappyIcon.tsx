import { Avatar, AvatarProps } from '@mui/material';
import { forwardRef, VFC } from 'react';

import icon from './images/happy.png';
import selectedIcon from './images/happy_selected.png';

import { Emotion, HAPPY } from '@/types/Calendar';

export const HappyIconColor = '#F08200';

type Props = Omit<AvatarProps, 'onClick'> & {
  onClick?: (emotion: Emotion) => void;
  selected?: boolean;
};

export const HappyIcon: VFC<Props> = forwardRef<HTMLDivElement, Props>(
  ({ onClick = () => {}, selected = false, ...rest }, ref) => {
    return (
      <Avatar alt={'幸せ'} src={selected ? selectedIcon : icon} onClick={() => onClick(HAPPY)} {...rest} ref={ref} />
    );
  }
);
