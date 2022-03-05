import { useValidationForm } from '@hooks/components/useValidationForm';
import { useAuthCommand } from '@hooks/domain/command/useAuthCommand';
import { useHandler } from '@hooks/util/useHandler';
import { useRouter } from '@hooks/util/useRouter';
import { Box, Link, useMediaQuery } from '@mui/material';
import { PasswordVisibilityIconButton } from '@ui/button/PasswordVisibilityIconButton';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { Card } from '@ui/card/Card';
import { CardActions } from '@ui/card/CardActions';
import { CardContent } from '@ui/card/CardContent';
import { InputText } from '@ui/input/InputText';
import { MouseEvent, useState, VFC } from 'react';
import { object, string } from 'yup';

type Form = {
  email: string;
  password: string;
};

export const SinginPage: VFC = () => {
  const { handleAsyncEvent } = useHandler();

  const { register, handleSubmit } = useValidationForm<Form>(
    object({
      email: string() //
        .defined()
        .default('')
        .required('メールアドレスを入力してください'),
      password: string() //
        .defined()
        .default('')
        .required('パスワードを入力してください。'),
    })
  );

  const { signInWithEmail } = useAuthCommand();
  const { push } = useRouter();

  const onClickSigninButton = handleAsyncEvent(async ({ email, password }: Form) => {
    await signInWithEmail(email, password);
  });

  const [showPassword, setShowPassword] = useState(false);
  const onClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const onMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const smartPhone = useMediaQuery('(max-width:600px)');
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Card sx={{ width: smartPhone ? '90%' : '40%' }}>
          <CardContent>
            <InputText label={'メールアドレス'} type={'email'} {...register('email')} fullWidth />
            <InputText
              label={'パスワード'}
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              fullWidth
              sx={{ marginTop: 2 }}
              InputProps={{
                endAdornment: (
                  <PasswordVisibilityIconButton
                    showPassword={showPassword}
                    onClickShowPassword={onClickShowPassword}
                    onMouseDownPassword={onMouseDownPassword}
                  />
                ),
              }}
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
            <PrimaryButton onClick={handleSubmit(onClickSigninButton)}>ログインする</PrimaryButton>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};
