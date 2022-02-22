import { useValidationForm } from '@hooks/components/useValidationForm';
import { useAuthCommand } from '@hooks/domain/command/useAuthCommand';
import { useHandler } from '@hooks/util/useHandler';
import { useRouter } from '@hooks/util/useRouter';
import { Box, useMediaQuery } from '@mui/material';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { Card } from '@ui/card/Card';
import { CardActions } from '@ui/card/CardActions';
import { CardContent } from '@ui/card/CardContent';
import { InputText } from '@ui/input/InputText';
import { VFC } from 'react';
import { object, string } from 'yup';

type Form = {
  email: string;
};

export const PasswordResetPage: VFC = () => {
  const { push } = useRouter();

  const { register, handleSubmit } = useValidationForm<Form>(
    object({
      email: string() //
        .required('メールアドレスを入力してください。')
        .email('メールアドレスの形式で入力してください。'),
    })
  );

  const { handleAsyncEvent } = useHandler();

  const { sendPasswordResetMail } = useAuthCommand();
  const onClickPasswordResetButton = handleAsyncEvent(async ({ email }: Form) => {
    await sendPasswordResetMail(email);
    push('/signin');
  });

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
          </CardContent>
          <CardActions>
            <PrimaryButton onClick={handleSubmit(onClickPasswordResetButton)}>メール送信</PrimaryButton>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};
