import { useReportAddModal } from '@hooks/components/useReportAddModal';
import { useDate } from '@hooks/util/useDate';
import { useEmotion } from '@hooks/util/useEmotion';
import {
  Box,
  CardProps,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  SelectChangeEvent,
} from '@mui/material';
import { NeutralButton } from '@ui/button/NeutralButton';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { Card } from '@ui/card/Card';
import { CardActions } from '@ui/card/CardActions';
import { CardContent } from '@ui/card/CardContent';
import { CardHeader } from '@ui/card/CardHeader';
import { InputSelect } from '@ui/input/InputSelect';
import { InputText } from '@ui/input/InputText';
import { ChangeEvent, forwardRef, useState, VFC } from 'react';

import { Emotion, NORMAL } from '@/types/Calendar';

const RefCard = forwardRef<HTMLDivElement, CardProps>((props, ref) => <Card forwardRef={ref} {...props} />);

export const ReportAddModal: VFC = () => {
  const { formatYmd, beforeDate } = useDate();

  const { open, onClickOk, onClickCancel } = useReportAddModal();
  const { emotions, isEmotionStr, getEmotionText } = useEmotion();

  const today = new Date();
  const [date, setDate] = useState(formatYmd(today));
  const dateOptions = [...Array(7)]
    .map((_, i) => beforeDate(today, i))
    .map((e) => ({ value: formatYmd(e), label: formatYmd(e) }));
  const [emotion, setEmotion] = useState<Emotion>(NORMAL);
  const [comment, setComment] = useState('');

  const onClickOkButton = () => {
    onClickOk({ date, emotion, comment });
    resetForm();
  };

  const onClickCancelButton = () => {
    onClickCancel();
    resetForm();
  };

  const resetForm = () => {
    setEmotion(NORMAL);
    setComment('');
  };

  const onChangeDate = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setDate(value);
  };

  const onChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setComment(value);
  };

  const onChangeEmotion = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (isEmotionStr(value)) {
      setEmotion(value);
    }
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
        <CardHeader onClose={onClickCancel} />
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box>
            <InputSelect label={'日付'} value={date} onChange={onChangeDate} options={dateOptions} />
            <FormControl>
              <RadioGroup row value={emotion} onChange={onChangeEmotion}>
                {emotions.map((e) => (
                  <FormControlLabel key={e} value={e} control={<Radio />} label={getEmotionText(e)} />
                ))}
              </RadioGroup>
            </FormControl>
            <InputText
              label={'コメント'}
              value={comment}
              onChange={onChangeComment}
              multiline
              rows={5}
              sx={{ marginTop: 2 }}
            />
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
