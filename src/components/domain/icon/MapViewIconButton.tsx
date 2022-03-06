import { CalendarViewMonth } from '@mui/icons-material';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { VFC } from 'react';

type Props = IconButtonProps & {};

export const MapViewIconButton: VFC<Props> = ({ onClick, color }) => {
  return (
    <Tooltip title={'マップビュー'} arrow placement={'top'}>
      <IconButton onClick={onClick} color={color}>
        <CalendarViewMonth />
      </IconButton>
    </Tooltip>
  );
};
