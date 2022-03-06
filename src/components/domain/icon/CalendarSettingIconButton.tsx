import { CalendarToday, Settings } from '@mui/icons-material';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { VFC } from 'react';

type Props = IconButtonProps & {};

export const CalendarSettingIconButton: VFC<Props> = ({ onClick }) => {
  return (
    <Tooltip title={'カレンダー設定'} arrow placement={'top'}>
      <IconButton onClick={onClick}>
        <Settings />
      </IconButton>
    </Tooltip>
  );
};
