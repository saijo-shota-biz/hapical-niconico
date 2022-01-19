import { useAuth } from '@hooks/util/useAuth';
import { useRouter } from '@hooks/util/useRouter';
import { Box } from '@mui/material';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { Card } from '@ui/card/Card';
import { CardActions } from '@ui/card/CardActions';
import { CardContent } from '@ui/card/CardContent';
import { InputText } from '@ui/input/InputText';
import { useInputText } from '@ui/input/useInputText';
import { useToast } from '@ui/utils/Toaster';
import { VFC } from 'react';

export const PasswordResetPage: VFC = () => {
  const email = useInputText();

  const { push } = useRouter();
  const { sendPasswordResetMail } = useAuth();
  const { showToast } = useToast();

  const onClickPasswordResetButton = async () => {
    await sendPasswordResetMail(email.value);
    showToast({
      status: 'success',
      message: 'メールを送信しました。確認してください。',
    });
    push('/signin');
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
          </CardContent>
          <CardActions>
            <PrimaryButton onClick={onClickPasswordResetButton}>メール送信</PrimaryButton>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};
