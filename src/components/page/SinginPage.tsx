import { useAuth } from '@hooks/util/useAuth';
import { useRouter } from '@hooks/util/useRouter';
import { Box, Link } from '@mui/material';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { Card } from '@ui/card/Card';
import { CardActions } from '@ui/card/CardActions';
import { CardContent } from '@ui/card/CardContent';
import { InputText } from '@ui/input/InputText';
import { useInputText } from '@ui/input/useInputText';
import { VFC } from 'react';

export const SinginPage: VFC = () => {
  const email = useInputText();
  const password = useInputText();

  const { signInWithEmail } = useAuth();
  const { push } = useRouter();

  const onClickSigninButton = async () => {
    await signInWithEmail(email.value, password.value);
    push('/');
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Card sx={{ width: '40%' }}>
          <CardContent>
            <InputText
              label={'メールアドレス'}
              type={'email'}
              {...email}
              fullWidth
              placeholder={'メールアドレスを入力してください'}
            />
            <InputText
              label={'パスワード'}
              type={'password'}
              {...password}
              fullWidth
              placeholder={'パスワードを入力してください'}
              sx={{ marginTop: 2 }}
            />

            <Link
              fontSize={'small'}
              sx={{ display: 'block', marginTop: 2, cursor: 'pointer' }}
              onClick={() => push('/password-reset')}
            >
              パスワードを忘れた場合
            </Link>

            <Link
              fontSize={'small'}
              sx={{ display: 'block', marginTop: 2, cursor: 'pointer' }}
              onClick={() => push('/signup')}
            >
              アカウントを登録する
            </Link>
          </CardContent>
          <CardActions>
            <PrimaryButton onClick={onClickSigninButton}>ログインする</PrimaryButton>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};
