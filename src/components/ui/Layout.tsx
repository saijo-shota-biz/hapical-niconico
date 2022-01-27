import { useAuth } from '@hooks/util/useAuth';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { useMenu } from '@hooks/util/useMenu';
import { useRouter } from '@hooks/util/useRouter';
import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip } from '@mui/material';
import { Label } from '@ui/typography/Label';
import { Spacer } from '@ui/utils/Spacer';
import { VFC } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout: VFC = () => {
  const { loginUser } = useLoginUser();
  const { signOut } = useAuth();
  const { anchorEl, open, openMenu, closeMenu } = useMenu();
  const { push } = useRouter();

  const onClickAccountMenu = () => {
    push('/account');
    closeMenu();
  };

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ display: 'flex' }}>
          <Label size={'lg'}>ハピカレ</Label>
          <Spacer />
          {loginUser && (
            <>
              <Tooltip title="設定を開く">
                <IconButton size={'small'} onClick={(e) => openMenu(e.currentTarget)} sx={{ p: 0 }}>
                  <Avatar
                    alt={loginUser.name}
                    src={loginUser.picture}
                    sx={{ width: '32px', height: '32px', backgroundColor: 'primary.600' }}
                  />
                </IconButton>
              </Tooltip>
              <Menu open={open} anchorEl={anchorEl} onClose={closeMenu}>
                <MenuItem onClick={onClickAccountMenu}>アカウント</MenuItem>
                <MenuItem onClick={signOut}>ログアウト</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, flexBasis: 0 }}>
        <Outlet />
      </Box>
    </>
  );
};
