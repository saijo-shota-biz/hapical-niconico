import { Avatar, AvatarProps, Tooltip, TooltipProps } from '@mui/material';
import { VFC } from 'react';

import { User } from '@/types/User';

type Props = AvatarProps &
  Partial<Pick<TooltipProps, 'title'>> & {
    user?: User;
  };

export const UserAvatar: VFC<Props> = ({ title = '', user, sx = {}, ...rest }) => {
  if (!user) {
    return null;
  }
  return (
    <Tooltip title={title} placement={'top'} arrow>
      <Avatar alt={user.name} src={user.picture} sx={sx} {...rest} />
    </Tooltip>
  );
};
