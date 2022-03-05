import { EmotionIcon } from '@domain/EmotionIcon';
import { useReportAddModal } from '@hooks/components/useReportAddModal';
import { useValidationForm } from '@hooks/components/useValidationForm';
import { useCalendarReportsQuery } from '@hooks/domain/query/useCalendarReportsQuery';
import { useDate } from '@hooks/util/useDate';
import { useEmotion } from '@hooks/util/useEmotion';
import { Box, Tooltip, useMediaQuery } from '@mui/material';
import { NeutralButton } from '@ui/button/NeutralButton';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { ModalCard } from '@ui/card/Card';
import { CardActions } from '@ui/card/CardActions';
import { CardContent } from '@ui/card/CardContent';
import { CardHeader } from '@ui/card/CardHeader';
import { InputText } from '@ui/input/InputText';
import { BaseModal } from '@ui/modal/BaseModal';
import { Label } from '@ui/typography/Label';
import { useEffect, useState, VFC } from 'react';
import { object, string } from 'yup';

import { NORMAL } from '@/types/Calendar';

type Form = {
  emotion: string;
  comment: string;
};

export const ReportAddModal: VFC = () => {
  const { formatYmdw } = useDate();
  const { reports } = useCalendarReportsQuery();

  const { emotions, getEmotionText } = useEmotion();

  const { open, onClickOk, onClickCancel, reportId, date } = useReportAddModal();

  const [targetDate, setTargetDate] = useState<Date>();
  const { register, handleSubmit, setValue, reset } = useValidationForm<Form>(
    object({
      emotion: string() //
        .defined()
        .default(NORMAL),
      comment: string() //
        .defined()
        .default(''),
    })
  );

  const { value: emotion, onChange: onChangeEmotion } = register('emotion');

  const { isEmotionStr } = useEmotion();

  useEffect(() => {
    if (open) {
      const report = reports.find((e) => e.uid === reportId);
      if (report) {
        setTargetDate(report.date);
        setValue('emotion', report.emotion);
        setValue('comment', report.comment);
      } else {
        setTargetDate(date);
        setValue('emotion', NORMAL);
        setValue('comment', '');
      }
    }
  }, [open]);

  const onClickOkButton = ({ emotion, comment }: Form) => {
    if (isEmotionStr(emotion)) {
      onClickOk({ uid: reportId, date, emotion, comment });
      reset();
    }
  };

  const onClickCancelButton = () => {
    onClickCancel();
    reset();
  };

  const smartPhone = useMediaQuery('(max-width:600px)');
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
      <ModalCard sx={{ width: smartPhone ? '90%' : '60%' }}>
        <CardHeader onClose={onClickCancelButton}>{targetDate && formatYmdw(targetDate)}の記録を残す</CardHeader>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Label size={'sm'} sx={{ display: 'block', marginBottom: 1, color: 'grey.500' }}>
                今日の気分はいかがですか？
              </Label>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {emotions.reverse().map((e) => (
                  <Tooltip key={e} title={getEmotionText(e)} arrow placement={'top'}>
                    <EmotionIcon
                      emotion={e}
                      onClick={(emotion) => onChangeEmotion(emotion)}
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
              placeholder={'短くてもいいので今の気持ちを記録しましょう'}
              {...register('comment')}
              multiline
              rows={10}
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
