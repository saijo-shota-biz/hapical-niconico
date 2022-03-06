import { useCalendarAddModal } from '@hooks/components/useCalendarAddModal';
import { useValidationForm } from '@hooks/components/useValidationForm';
import { NeutralButton } from '@ui/button/NeutralButton';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { ModalCard } from '@ui/card/Card';
import { CardActions } from '@ui/card/CardActions';
import { CardContent } from '@ui/card/CardContent';
import { CardHeader } from '@ui/card/CardHeader';
import { InputRadioGroup } from '@ui/input/InputRadioGroup';
import { InputText } from '@ui/input/InputText';
import { BaseModal } from '@ui/modal/BaseModal';
import { VFC } from 'react';
import { object, string } from 'yup';

type Form = {
  shared: string;
  calendarName: string;
};

export const CalendarAddModal: VFC = () => {
  const { open, onClickCancel, onClickOk } = useCalendarAddModal();

  const { register, handleSubmit, reset } = useValidationForm<Form>(
    object({
      calendarName: string() //
        .defined()
        .default('')
        .required('カレンダー名は必須です。'),
      shared: string() //
        .defined()
        .default('0')
        .required('どちらかを選択してください。')
        .oneOf(['0', '1'], 'ひとりで使う か みんなで使うのどちらかを選択してください。'),
    })
  );
  const sharedOptions = [
    { value: '0', label: 'ひとりで使う' },
    { value: '1', label: 'みんなで使う' },
  ];

  const onClickOkButton = ({ calendarName, shared }: Form) => {
    onClickOk({ name: calendarName, shared: shared === '1' });
    reset();
  };

  const onClickCancelButton = () => {
    onClickCancel();
    reset();
  };

  return (
    <BaseModal
      open={open}
      onClose={onClickCancelButton}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ModalCard>
        <CardHeader onClose={onClickCancelButton}>新しいカレンダーを作成する</CardHeader>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <InputRadioGroup
            row
            label={''}
            options={sharedOptions}
            {...register('shared')}
            defaultValue={sharedOptions[0].value}
          />
          <InputText
            sx={{ marginTop: 2 }}
            label={'新しいカレンダー名'}
            {...register('calendarName')}
            placeholder={'新しいカレンダー名を入力してください'}
          />
        </CardContent>
        <CardActions>
          <NeutralButton onClick={onClickCancelButton}>キャンセル</NeutralButton>
          <PrimaryButton onClick={handleSubmit(onClickOkButton)}>送信</PrimaryButton>
        </CardActions>
      </ModalCard>
    </BaseModal>
  );
};
