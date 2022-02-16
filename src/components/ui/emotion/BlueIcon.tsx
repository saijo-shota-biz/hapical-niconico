import { Avatar, AvatarProps } from '@mui/material';
import React, { forwardRef, VFC } from 'react';

import icon from './images/blue.png';
import selectedIcon from './images/blue_selected.png';

import { BLUE, Emotion } from '@/types/Calendar';

export const BlueIconColor = '#12B6D1';

type Props = Omit<AvatarProps, 'onClick'> & {
  onClick?: (emotion: Emotion) => void;
  selected?: boolean;
};

export const BlueIcon: VFC<Props> = forwardRef<HTMLDivElement, Props>(
  ({ onClick = () => {}, selected = false, ...rest }, ref) => {
    return (
      <Avatar alt={'ブルー'} src={selected ? selectedIcon : icon} onClick={() => onClick(BLUE)} {...rest} ref={ref} />
    );
  }
);
