import { EmotionIcon } from '@domain/EmotionIcon';
import { useReportAddModal } from '@hooks/components/useReportAddModal';
import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { useDate } from '@hooks/util/useDate';
import { useEmotion } from '@hooks/util/useEmotion';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { Box, Modal, Tooltip, useMediaQuery } from '@mui/material';
import { NeutralButton } from '@ui/button/NeutralButton';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { RefCard } from '@ui/card/Card';
import { CardActions } from '@ui/card/CardActions';
import { CardContent } from '@ui/card/CardContent';
import { CardHeader } from '@ui/card/CardHeader';
import { InputText } from '@ui/input/InputText';
import { Label } from '@ui/typography/Label';
import { useEffect, useState, VFC } from 'react';

import { Emotion, NORMAL } from '@/types/Calendar';

export const ReportAddModal: VFC = () => {
  const { formatYmd } = useDate();
  const { calendar } = useCalendarQuery();
  const { loginUser } = useLoginUser();
  const { isSameYmd } = useDate();

  const { emotions, getEmotionText } = useEmotion();

  const { open, onClickOk, onClickCancel, date: selectDate } = useReportAddModal();

  const [date, setDate] = useState('');
  const [emotion, setEmotion] = useState<Emotion>(NORMAL);
  const [comment, setComment] = useState('');
  const [reportId, setReportId] = useState('');

  useEffect(() => {
    setDate(formatYmd(selectDate));
    const report = calendar?.reports.find((e) => e.userId === loginUser?.uid && isSameYmd(e.date, selectDate));
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

  const smartPhone = useMediaQuery('(max-width:600px)');
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
      <RefCard sx={{ width: smartPhone ? '90%' : '60%' }}>
        <CardHeader onClose={onClickCancelButton}>{date}のレポートを作成する</CardHeader>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Label size={'sm'} sx={{ display: 'inline-block', marginBottom: 1, color: 'grey.500' }}>
              今日の気分はいかがですか？
            </Label>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {emotions.reverse().map((e) => (
                <Tooltip key={e} title={getEmotionText(e)} arrow placement={'top'}>
                  <EmotionIcon
                    emotion={e}
                    onClick={setEmotion}
                    sx={{
                      cursor: 'pointer',
                      width: smartPhone ? '40px' : '56px',
                      height: smartPhone ? '40px' : '56px',
                    }}
                    selected={emotion === e}
                  />
                </Tooltip>
              ))}
            </Box>
            <InputText
              label={'コメント'}
              value={comment}
              onChange={(e) => setComment(e.currentTarget.value)}
              placeholder={'短くてもいいので今の気持ちを記録しましょう'}
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
