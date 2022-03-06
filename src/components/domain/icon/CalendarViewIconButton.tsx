import { CalendarToday } from '@mui/icons-material';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { VFC } from 'react';

type Props = IconButtonProps & {};

export const CalendarViewIconButton: VFC<Props> = ({ onClick, color }) => {
  return (
    <Tooltip title={'カレンダービュー'} arrow placement={'top'}>
      <IconButton onClick={onClick} color={color}>
        <CalendarToday />
      </IconButton>
    </Tooltip>
  );
};
