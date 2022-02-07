import { useCalendarAddModal } from '@hooks/components/useCalendarAddModal';
import { Box, Modal } from '@mui/material';
import { NeutralButton } from '@ui/button/NeutralButton';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { RefCard } from '@ui/card/Card';
import { CardActions } from '@ui/card/CardActions';
import { CardContent } from '@ui/card/CardContent';
import { CardHeader } from '@ui/card/CardHeader';
import { InputText } from '@ui/input/InputText';
import { useState, VFC } from 'react';

export const CalendarAddModal: VFC = () => {
  const { open, onClickCancel, onClickOk } = useCalendarAddModal();

  const [name, setName] = useState('');

  const resetForm = () => {
    setName('');
  };

  const onClickOkButton = () => {
    onClickOk({ name });
    resetForm();
  };
  const onClickCancelButton = () => {
    onClickCancel();
    resetForm();
  };

  return (
    <Modal
      open={open}
      onClose={onClickCancel}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RefCard sx={{ width: '60%' }}>
        <CardHeader onClose={onClickCancel}>カレンダーを作成する</CardHeader>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box>
            <InputText label={'カレンダー名'} value={name} onChange={(e) => setName(e.currentTarget.value)} />
          </Box>
        </CardContent>
        <CardActions>
          <NeutralButton onClick={onClickCancelButton}>キャンセル</NeutralButton>
          <PrimaryButton onClick={onClickOkButton}>送信</PrimaryButton>
        </CardActions>
      </RefCard>
    </Modal>
  );
};
