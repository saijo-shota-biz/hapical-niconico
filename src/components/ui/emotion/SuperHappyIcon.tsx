import { Avatar, AvatarProps } from '@mui/material';
import { VFC } from 'react';

import icon from './images/super_happy.png';
import selectedIcon from './images/super_happy_selected.png';

import { Emotion, SUPER_HAPPY } from '@/types/Calendar';

export const SuperHappyIconColor = '#E84B85';

type Props = Omit<AvatarProps, 'onClick'> & {
  onClick?: (emotion: Emotion) => void;
  selected?: boolean;
};

export const SuperHappyIcon: VFC<Props> = ({ onClick = () => {}, selected = false, ...rest }) => {
  return <Avatar alt={'超幸せ'} src={selected ? selectedIcon : icon} onClick={() => onClick(SUPER_HAPPY)} {...rest} />;
};
