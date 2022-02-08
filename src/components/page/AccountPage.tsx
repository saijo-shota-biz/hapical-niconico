import { useUserCommand } from '@hooks/domain/command/useUserCommand';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { useStorage } from '@hooks/util/useStorage';
import { CameraAlt } from '@mui/icons-material';
import { Avatar, Box, Tooltip } from '@mui/material';
import { Breadcrumbs } from '@ui/breadcrumbs/Breadcrumbs';
import { AccountBreadcrumbs, HomeBreadcrumbs } from '@ui/breadcrumbs/breadcrumbsLinks';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { Card } from '@ui/card/Card';
import { CardActions } from '@ui/card/CardActions';
import { CardContent } from '@ui/card/CardContent';
import { InputText } from '@ui/input/InputText';
import { ChangeEvent, useEffect, useRef, useState, VFC } from 'react';

export const AccountPage: VFC = () => {
  const breadcrumbs = [HomeBreadcrumbs(), AccountBreadcrumbs()];

  const { loginUser, setLoginUser } = useLoginUser();

  const [userName, setUserName] = useState('');
  const [picture, setPicture] = useState('');
  useEffect(() => {
    if (loginUser) {
      setUserName(loginUser.name);
      setPicture(loginUser.picture);
    }
  }, [loginUser]);

  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const onClickUserAvatar = () => {
    hiddenInputRef.current?.click();
  };

  const onChangeUserPicture = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { upload } = useStorage();
  const { editUser } = useUserCommand();
  const onClickSaveButton = async () => {
    if (loginUser) {
      const url = await upload(picture);
      const newUser = {
        uid: loginUser.uid,
        name: userName,
        picture: url,
      };
      await editUser(newUser);
      await setLoginUser(newUser);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Card sx={{ margin: 2 }}>
          <CardContent sx={{ display: 'flex', gap: '32px' }}>
            <Box
              sx={{
                position: 'relative',
                cursor: 'pointer',
                ':hover': {
                  opacity: 0.8,
                },
              }}
              onClick={onClickUserAvatar}
            >
              <Avatar alt={loginUser?.name} src={picture} sx={{ width: 96, height: 96 }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  backgroundColor: 'primary.50',
                  opacity: 0.4,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 'calc(50% - 18px)',
                  left: 'calc(50% - 18px)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'primary.300',
                  opacity: 0.7,
                }}
              />
              <Tooltip title={'画像を変更する'}>
                <CameraAlt
                  sx={{
                    position: 'absolute',
                    top: 'calc(50% - 12px)',
                    left: 'calc(50% - 12px)',
                    fontSize: '24px',
                    color: 'common.white',
                  }}
                />
              </Tooltip>
            </Box>
            <input type={'file'} onChange={onChangeUserPicture} ref={hiddenInputRef} hidden />
            <InputText label={'ユーザー名'} value={userName} onChange={(e) => setUserName(e.currentTarget.value)} />
          </CardContent>
          <CardActions>
            <PrimaryButton onClick={onClickSaveButton}>送信</PrimaryButton>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};
