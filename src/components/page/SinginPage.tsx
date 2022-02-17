import { useValidationForm } from '@hooks/components/useValidationForm';
import { useAuth } from '@hooks/util/useAuth';
import { useRouter } from '@hooks/util/useRouter';
import { Box, Link } from '@mui/material';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { Card } from '@ui/card/Card';
import { CardActions } from '@ui/card/CardActions';
import { CardContent } from '@ui/card/CardContent';
import { InputText } from '@ui/input/InputText';
import { useState, VFC } from 'react';
import { object, string } from 'yup';

type Form = {
  email: string;
  password: string;
};

export const SinginPage: VFC = () => {
  const { register, handleSubmit } = useValidationForm<Form>(
    object({
      email: string() //
        .required('メールアドレスを入力してください'),
      password: string() //
        .required('パスワードを入力してください。'),
    })
  );

  const { signInWithEmail } = useAuth();
  const { pushOrRedirectUrl, push } = useRouter();

  const [loading, setLoading] = useState(false);
  const onClickSigninButton = async ({ email, password }: Form) => {
    setLoading(true);
    await signInWithEmail(email, password);
    setLoading(false);
    pushOrRedirectUrl('/');
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Card sx={{ width: '40%' }}>
          <CardContent>
            <InputText label={'メールアドレス'} type={'email'} {...register('email')} fullWidth />
            <InputText
              label={'パスワード'}
              type={'password'}
              {...register('password')}
              fullWidth
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
            <PrimaryButton onClick={handleSubmit(onClickSigninButton)} loading={loading}>
              ログインする
            </PrimaryButton>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};
