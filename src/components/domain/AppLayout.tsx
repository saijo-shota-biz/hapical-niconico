import { useMenu } from '@hooks/components/useMenu';
import { useAuth } from '@hooks/util/useAuth';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { useRouter } from '@hooks/util/useRouter';
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Layout } from '@ui/Layout';
import { Label } from '@ui/typography/Label';
import { Loading } from '@ui/utils/Loading';
import { Spacer } from '@ui/utils/Spacer';
import { Fragment, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  const { loginUser } = useLoginUser();
  const { signOut } = useAuth();
  const { anchorEl, open, openMenu, closeMenu } = useMenu();
  const { push } = useRouter();

  const onClickAccountMenu = () => {
    push('/account');
    closeMenu();
  };

  return (
    <Layout>
      <Fragment key={'header'}>
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
                >
                  {!loginUser.picture && loginUser.name[0]}
                </Avatar>
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
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Fragment>
    </Layout>
  );
};
