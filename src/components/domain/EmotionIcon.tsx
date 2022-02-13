import { AvatarProps } from '@mui/material';
import { BlueIcon } from '@ui/emotion/BlueIcon';
import { HappyIcon } from '@ui/emotion/HappyIcon';
import { NormalIcon } from '@ui/emotion/NormalIcon';
import { SuperBlueIcon } from '@ui/emotion/SuperBlueIcon';
import { SuperHappyIcon } from '@ui/emotion/SuperHappyIcon';
import { VFC } from 'react';

import { BLUE, Emotion, HAPPY, NORMAL, SUPER_BLUE, SUPER_HAPPY } from '@/types/Calendar';

type Props = Omit<AvatarProps, 'onClick'> & {
  emotion: Emotion;
  onClick?: (emotion: Emotion) => void;
  selected?: boolean;
};

export const EmotionIcon: VFC<Props> = ({ emotion, onClick = () => {}, selected = false, ...rest }) => {
  if (emotion === SUPER_HAPPY) {
    return <SuperHappyIcon onClick={onClick} selected={selected} {...rest} />;
  }
  if (emotion === HAPPY) {
    return <HappyIcon onClick={onClick} selected={selected} {...rest} />;
  }
  if (emotion === NORMAL) {
    return <NormalIcon onClick={onClick} selected={selected} {...rest} />;
  }
  if (emotion === BLUE) {
    return <BlueIcon onClick={onClick} selected={selected} {...rest} />;
  }
  if (emotion === SUPER_BLUE) {
    return <SuperBlueIcon onClick={onClick} selected={selected} {...rest} />;
  }
  return null;
};
