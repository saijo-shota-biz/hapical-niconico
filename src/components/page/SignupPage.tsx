import { useValidationForm } from '@hooks/components/useValidationForm';
import { useAuthCommand } from '@hooks/domain/command/useAuthCommand';
import { useUserCommand } from '@hooks/domain/command/useUserCommand';
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
import { object, ref, string } from 'yup';

type Form = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export const SignupPage: VFC = () => {
  const { push } = useRouter();

  const { handleAsyncEvent } = useHandler();

  const { register, handleSubmit } = useValidationForm<Form>(
    object({
      email: string() //
        .defined()
        .default('')
        .required('メールアドレスを入力してください。')
        .email('メールアドレスの形式で入力してください。'),
      password: string() //
        .defined()
        .default('')
        .required('パスワードを入力してください。')
        .min(8, '8文字以上のパスワードを入力してください。'),
      passwordConfirm: string() //
        .defined()
        .default('')
        .required('パスワードをもう一度入力してください。')
        .oneOf([ref('password'), null], 'パスワードと一致しません。'),
    })
  );

  const { signUp } = useAuthCommand();
  const { createUser } = useUserCommand();

  const onClickSignupButton = handleAsyncEvent(async ({ email, password }: Form) => {
    const user = await signUp(email, password);
    await createUser(user);
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const onClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const onMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const onClickShowPasswordConfirm = () => {
    setShowPasswordConfirm((prevState) => !prevState);
  };

  const smartPhone = useMediaQuery('(max-width:600px)');
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Card sx={{ width: smartPhone ? '90%' : '40%' }}>
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
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              fullWidth
              placeholder={'パスワードを入力してください'}
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
            <InputText
              label={'パスワード確認'}
              type={showPasswordConfirm ? 'text' : 'password'}
              {...register('passwordConfirm')}
              fullWidth
              sx={{ marginTop: 2 }}
              InputProps={{
                endAdornment: (
                  <PasswordVisibilityIconButton
                    showPassword={showPasswordConfirm}
                    onClickShowPassword={onClickShowPasswordConfirm}
                    onMouseDownPassword={onMouseDownPassword}
                  />
                ),
              }}
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
            <PrimaryButton onClick={handleSubmit(onClickSignupButton)}>登録する</PrimaryButton>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};
