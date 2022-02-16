import { Avatar, AvatarProps } from '@mui/material';
import { forwardRef, VFC } from 'react';

import icon from './images/super_blue.png';
import selectedIcon from './images/super_blue_selected.png';

import { Emotion, SUPER_BLUE } from '@/types/Calendar';

export const SuperBlueIconColor = '#1C499E';

type Props = Omit<AvatarProps, 'onClick'> & {
  onClick?: (emotion: Emotion) => void;
  selected?: boolean;
};

export const SuperBlueIcon: VFC<Props> = forwardRef<HTMLDivElement, Props>(
  ({ onClick = () => {}, selected = false, ...rest }, ref) => {
    return (
      <Avatar
        alt={'普通'}
        src={selected ? selectedIcon : icon}
        onClick={() => onClick(SUPER_BLUE)}
        {...rest}
        ref={ref}
      />
    );
  }
);
