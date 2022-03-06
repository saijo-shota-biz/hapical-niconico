import { ViewList } from '@mui/icons-material';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { VFC } from 'react';

type Props = IconButtonProps & {};

export const ListViewIconButton: VFC<Props> = ({ onClick, color }) => {
  return (
    <Tooltip title={'リストビュー'} arrow placement={'top'}>
      <IconButton onClick={onClick} color={color}>
        <ViewList />
      </IconButton>
    </Tooltip>
  );
};
