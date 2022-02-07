import { Avatar, AvatarGroup, Tooltip } from '@mui/material';
import { VFC } from 'react';

import { User } from '@/types/User';

type Props = {
  users: User[];
};

export const UserAvatarList: VFC<Props> = ({ users }) => {
  return (
    <AvatarGroup
      max={6}
      spacing={'medium'}
      sx={{
        justifyContent: 'start',
        '> .MuiAvatarGroup-avatar': {
          width: '32px',
          height: '32px',
          fontSize: '16px',
        },
      }}
    >
      {users.map((e) => (
        <Tooltip key={e.uid} title={e.name} placement={'top-start'}>
          <Avatar alt={e.name} src={e.picture} sx={{ width: 24, height: 24 }} />
        </Tooltip>
      ))}
    </AvatarGroup>
  );
};
