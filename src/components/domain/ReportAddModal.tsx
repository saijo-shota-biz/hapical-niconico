import { useReportAddModal } from '@hooks/components/useReportAddModal';
import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { useDate } from '@hooks/util/useDate';
import { useEmotion } from '@hooks/util/useEmotion';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { Box, FormControl, FormControlLabel, Modal, Radio, RadioGroup } from '@mui/material';
import { NeutralButton } from '@ui/button/NeutralButton';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { RefCard } from '@ui/card/Card';
import { CardActions } from '@ui/card/CardActions';
import { CardContent } from '@ui/card/CardContent';
import { CardHeader } from '@ui/card/CardHeader';
import { InputText } from '@ui/input/InputText';
import { ChangeEvent, useEffect, useState, VFC } from 'react';

import { Emotion, NORMAL } from '@/types/Calendar';

export const ReportAddModal: VFC = () => {
  const { formatYmd } = useDate();
  const { calendar } = useCalendarQuery();
  const { loginUser } = useLoginUser();
  const { isSameYmd, parseDateFromYmd } = useDate();

  const { open, onClickOk, onClickCancel, date: selectDate } = useReportAddModal();
  const { emotions, isEmotionStr, getEmotionText } = useEmotion();

  const [date, setDate] = useState(formatYmd(selectDate));
  const [emotion, setEmotion] = useState<Emotion>(NORMAL);
  const [comment, setComment] = useState('');
  const [reportId, setReportId] = useState('');

  useEffect(() => {
    setDate(formatYmd(selectDate));
    const report = calendar?.reports.find(
      (e) => e.userId === loginUser?.uid && isSameYmd(parseDateFromYmd(e.year, e.month, e.date), selectDate)
    );
    if (report) {
      setReportId(report.uid);
      setEmotion(report.emotion);
      setComment(report.comment);
    } else {
      setReportId('');
      setEmotion(NORMAL);
      setComment('');
    }
  }, [selectDate, calendar]);

  const onClickOkButton = () => {
    onClickOk({ uid: reportId, date, emotion, comment });
    resetForm();
  };

  const onClickCancelButton = () => {
    onClickCancel();
    resetForm();
  };

  const resetForm = () => {
    setDate(formatYmd(selectDate));
    setEmotion(NORMAL);
    setComment('');
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
      onClose={onClickCancelButton}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RefCard sx={{ width: '60%' }}>
        <CardHeader onClose={onClickCancelButton}>{date}のレポートを作成する</CardHeader>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
