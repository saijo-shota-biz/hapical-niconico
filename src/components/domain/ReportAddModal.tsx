import { EmotionIcon } from '@domain/EmotionIcon';
import { useReportAddModal } from '@hooks/components/useReportAddModal';
import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { useCalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
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
import { InputSelect } from '@ui/input/InputSelect';
import { InputText } from '@ui/input/InputText';
import { Label } from '@ui/typography/Label';
import { useEffect, useState, VFC } from 'react';

import { Emotion, NORMAL } from '@/types/Calendar';

type Props = {
  calendarSelectable?: boolean;
};

export const ReportAddModal: VFC<Props> = ({ calendarSelectable = false }) => {
  const { formatYmd } = useDate();
  const { calendars } = useCalendarsQuery();
  const { calendar, setQueryCalendarId } = useCalendarQuery();
  const { loginUser } = useLoginUser();
  const { isSameYmd } = useDate();

  const { emotions, getEmotionText } = useEmotion();

  const { open, onClickOk, onClickCancel, date: selectDate } = useReportAddModal();

  const [calendarId, setCalendarId] = useState('');
  useEffect(() => {
    if (calendarId) {
      setQueryCalendarId(calendarId);
    }
  }, [calendarId]);
  const [date, setDate] = useState('');
  const [emotion, setEmotion] = useState<Emotion>(NORMAL);
  const [comment, setComment] = useState('');
  const [reportId, setReportId] = useState('');
  useEffect(() => {
    setDate(formatYmd(selectDate));
    setCalendarId(calendar?.uid || calendars[0].uid || '');
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
    onClickOk({ uid: reportId, calendarId, date, emotion, comment });
    resetForm();
  };

  const onClickCancelButton = () => {
    onClickCancel();
    resetForm();
  };

  const resetForm = () => {
    setCalendarId('');
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
        <CardHeader onClose={onClickCancelButton}>{date}の記録を残す</CardHeader>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {calendarSelectable && (
              <InputSelect
                value={calendarId}
                options={calendars.map((e) => ({ label: e.name, value: e.uid }))}
                onChange={(e) => setCalendarId(e.target.value)}
                label={'カレンダー'}
              />
            )}
            <Box>
              <Label size={'sm'} sx={{ display: 'block', marginBottom: 1, color: 'grey.500' }}>
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
            </Box>
            <InputText
              label={'コメント'}
              value={comment}
              onChange={(e) => setComment(e.currentTarget.value)}
              placeholder={'短くてもいいので今の気持ちを記録しましょう'}
              multiline
              rows={5}
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
