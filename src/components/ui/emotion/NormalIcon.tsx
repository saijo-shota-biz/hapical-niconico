import { Avatar, AvatarProps } from '@mui/material';
import { forwardRef, VFC } from 'react';

import icon from './images/normal.png';
import selectedIcon from './images/normal_selected.png';

import { Emotion, NORMAL } from '@/types/Calendar';

export const NormalIconColor = '#58B530';

type Props = Omit<AvatarProps, 'onClick'> & {
  onClick?: (emotion: Emotion) => void;
  selected?: boolean;
};

export const NormalIcon: VFC<Props> = forwardRef<HTMLDivElement, Props>(
  ({ onClick = () => {}, selected = false, ...rest }, ref) => {
    return (
      <Avatar alt={'普通'} src={selected ? selectedIcon : icon} onClick={() => onClick(NORMAL)} {...rest} ref={ref} />
    );
  }
);
