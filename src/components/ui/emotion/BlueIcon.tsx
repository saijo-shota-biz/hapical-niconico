import { Avatar, AvatarProps } from '@mui/material';
import { VFC } from 'react';

import icon from './images/blue.png';
import selectedIcon from './images/blue_selected.png';

import { BLUE, Emotion } from '@/types/Calendar';

export const BlueIconColor = '#12B6D1';

type Props = Omit<AvatarProps, 'onClick'> & {
  onClick?: (emotion: Emotion) => void;
  selected?: boolean;
};

export const BlueIcon: VFC<Props> = ({ onClick = () => {}, selected = false, ...rest }) => {
  return <Avatar alt={'ブルー'} src={selected ? selectedIcon : icon} onClick={() => onClick(BLUE)} {...rest} />;
};
