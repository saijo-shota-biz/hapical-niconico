import { useInputText } from '@hooks/components/useInputText';
import { useUserCommand } from '@hooks/domain/command/useUserCommand';
import { useAuth } from '@hooks/util/useAuth';
import { useRouter } from '@hooks/util/useRouter';
import { Box, Link } from '@mui/material';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { Card } from '@ui/card/Card';
import { CardActions } from '@ui/card/CardActions';
import { CardContent } from '@ui/card/CardContent';
import { InputText } from '@ui/input/InputText';
import { useState, VFC } from 'react';

export const SignupPage: VFC = () => {
  const email = useInputText();
  const password = useInputText();
  const passwordConfirm = useInputText();

  const { signUp } = useAuth();
  const { push } = useRouter();
  const { createUser } = useUserCommand();

  const [loading, setLoading] = useState(false);

  const onClickSignupButton = async () => {
    setLoading(true);
    const user = await signUp(email.value, password.value);
    await createUser(user);
    setLoading(false);
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
            <InputText
              label={'パスワード確認'}
              type={'password'}
              {...passwordConfirm}
              fullWidth
              placeholder={'もう一度パスワードを入力してください'}
              sx={{ marginTop: 2 }}
            />

            <Link
              fontSize={'small'}
              sx={{ display: 'block', marginTop: 2, cursor: 'pointer' }}
              onClick={() => push('/signin')}
            >
              ログインする
            </Link>
          </CardContent>
          <CardActions>
            <PrimaryButton onClick={onClickSignupButton} loading={loading}>
              登録する
            </PrimaryButton>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};
