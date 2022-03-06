import { Suspense } from '@function/Suspense';
import { useMenu } from '@hooks/components/useMenu';
import { useAuthCommand } from '@hooks/domain/command/useAuthCommand';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { useRouter } from '@hooks/util/useRouter';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { SuperBlueIcon } from '@ui/emotion/SuperBlueIcon';
import { SuperHappyIcon } from '@ui/emotion/SuperHappyIcon';
import { Layout } from '@ui/Layout';
import { Label } from '@ui/typography/Label';
import { Spacer } from '@ui/utils/Spacer';
import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  const { loginUser } = useLoginUser();
  const { signOut } = useAuthCommand();
  const { anchorEl, open, openMenu, closeMenu } = useMenu();
  const { push } = useRouter();

  const onClickAccountMenu = () => {
    push('/account');
    closeMenu();
  };

  return (
    <Layout>
      <Fragment key={'header'}>
        <Box onClick={() => push('/')} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
          <SuperHappyIcon sx={{ width: '32px', height: '32px' }} />
          <Label size={'lg'}>ハッピーカレンダー</Label>
          <SuperBlueIcon sx={{ width: '32px', height: '32px' }} />
        </Box>
        <Spacer />
        {loginUser && (
          <>
            <Tooltip title="設定を開く" placement={'top'} arrow>
              <IconButton size={'small'} onClick={(e) => openMenu(e.currentTarget)} sx={{ p: 0 }}>
                <Avatar alt={loginUser.name} src={loginUser.picture} sx={{ width: '32px', height: '32px' }} />
              </IconButton>
            </Tooltip>
            <Menu open={open} anchorEl={anchorEl} onClose={closeMenu}>
              <MenuItem onClick={onClickAccountMenu}>アカウント</MenuItem>
              <MenuItem onClick={signOut}>ログアウト</MenuItem>
            </Menu>
          </>
        )}
      </Fragment>
      <Fragment key={'main'}>
        <Suspense>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Outlet />
          </Box>
        </Suspense>
      </Fragment>
    </Layout>
  );
};
