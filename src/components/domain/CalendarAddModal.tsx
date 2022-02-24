import { useCalendarAddModal } from '@hooks/components/useCalendarAddModal';
import { useValidationForm } from '@hooks/components/useValidationForm';
import { Box } from '@mui/material';
import { NeutralButton } from '@ui/button/NeutralButton';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { ModalCard } from '@ui/card/Card';
import { CardActions } from '@ui/card/CardActions';
import { CardContent } from '@ui/card/CardContent';
import { CardHeader } from '@ui/card/CardHeader';
import { InputText } from '@ui/input/InputText';
import { BaseModal } from '@ui/modal/BaseModal';
import { VFC } from 'react';
import { object, string } from 'yup';

type Form = {
  calendarName: string;
};

export const CalendarAddModal: VFC = () => {
  const { open, onClickCancel, onClickOk } = useCalendarAddModal();

  const { register, handleSubmit, reset } = useValidationForm<Form>(
    object({
      calendarName: string() //
        .required('カレンダー名は必須です。'),
    })
  );

  const onClickOkButton = ({ calendarName }: Form) => {
    onClickOk({ name: calendarName });
    reset({ calendarName: '' });
  };
  const onClickCancelButton = () => {
    onClickCancel();
    reset({ calendarName: '' });
  };

  return (
    <BaseModal
      open={open}
      onClose={onClickCancel}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ModalCard>
        <CardHeader onClose={onClickCancel}>新しいカレンダーを作成する</CardHeader>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box>
            <InputText
              label={'新しいカレンダー名'}
              {...register('calendarName')}
              placeholder={'新しいカレンダー名を入力してください'}
            />
          </Box>
        </CardContent>
        <CardActions>
          <NeutralButton onClick={onClickCancelButton}>キャンセル</NeutralButton>
          <PrimaryButton onClick={handleSubmit(onClickOkButton)}>送信</PrimaryButton>
        </CardActions>
      </ModalCard>
    </BaseModal>
  );
};
