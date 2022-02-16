import { UserAvatar } from '@domain/UserAvatar';
import { AvatarGroup } from '@mui/material';
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
        <UserAvatar key={e.uid} user={e} title={e.name} sx={{ width: '24px', height: '24px' }} />
      ))}
    </AvatarGroup>
  );
};
