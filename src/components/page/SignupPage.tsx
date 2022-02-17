import { useValidationForm } from '@hooks/components/useValidationForm';
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
import { object, ref, string } from 'yup';

type Form = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export const SignupPage: VFC = () => {
  const { register, handleSubmit } = useValidationForm<Form>(
    object({
      email: string() //
        .required('メールアドレスを入力してください。')
        .email('メールアドレスの形式で入力してください。'),
      password: string() //
        .required('パスワードを入力してください。')
        .min(8, '8文字以上のパスワードを入力してください。'),
      passwordConfirm: string() //
        .required('パスワードをもう一度入力してください。')
        .oneOf([ref('password'), null], 'パスワードと一致しません。'),
    })
  );

  const { signUp } = useAuth();
  const { pushOrRedirectUrl, push } = useRouter();
  const { createUser } = useUserCommand();

  const [loading, setLoading] = useState(false);

  const onClickSignupButton = async ({ email, password }: Form) => {
    setLoading(true);
    const user = await signUp(email, password);
    await createUser(user);
    setLoading(false);
    pushOrRedirectUrl('/');
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Card sx={{ width: '40%' }}>
          <CardContent>
            <InputText
              label={'メールアドレス'}
              type={'email'}
              {...register('email')}
              fullWidth
              placeholder={'メールアドレスを入力してください'}
            />
            <InputText
              label={'パスワード'}
              type={'password'}
              {...register('password')}
              fullWidth
              placeholder={'パスワードを入力してください'}
              sx={{ marginTop: 2 }}
            />
            <InputText
              label={'パスワード確認'}
              type={'password'}
              {...register('passwordConfirm')}
              fullWidth
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
            <PrimaryButton onClick={handleSubmit(onClickSignupButton)} loading={loading}>
              登録する
            </PrimaryButton>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};
