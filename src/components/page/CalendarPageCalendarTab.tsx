import { Calendar } from '@domain/Calendar';
import { UserAvatarList } from '@domain/UserAvatarList';
import { useReportAddModal } from '@hooks/components/useReportAddModal';
import { useCalendarCommand } from '@hooks/domain/command/useCalendarCommand';
import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { useDate } from '@hooks/util/useDate';
import { useHandler } from '@hooks/util/useHandler';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { Label } from '@ui/typography/Label';
import { Spacer } from '@ui/utils/Spacer';
import { Dispatch, SetStateAction, useEffect, VFC } from 'react';

type Props = {
  baseDate: Date;
  setBaseDate: Dispatch<SetStateAction<Date>>;
};

export const CalendarPageCalendarTab: VFC<Props> = ({ baseDate, setBaseDate }) => {
  const { loginUser } = useLoginUser();

  const { calendar } = useCalendarQuery();
  const { addReport } = useCalendarCommand();

  const { handleAsyncEvent } = useHandler();

  const { parseDateFromString, formatYm, nextMonth, prevMonth, isThisMonth } = useDate();

  const { showReportAddModal, closeReportAddModal } = useReportAddModal();
  const onClickAddButton = handleAsyncEvent(async (date: Date) => {
    const result = await showReportAddModal(date);
    if (result) {
      const date = parseDateFromString(result.date);
      await addReport(
        {
          calendarId: result.calendarId,
          userId: loginUser?.uid || '',
          date,
          emotion: result.emotion,
          comment: result.comment,
        },
        result.uid
      );
      closeReportAddModal();
    }
  });
  useEffect(() => {
    return () => closeReportAddModal();
  }, []);

  return (
    <>
      <Box sx={{ padding: 2, flexGrow: 1, flexBasis: 0, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ paddingY: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
          <IconButton onClick={() => setBaseDate((prev) => prevMonth(prev))}>
            <ArrowBackIosNewOutlined />
          </IconButton>
          <Label size={'lg'}>{formatYm(baseDate)}</Label>
          <IconButton disabled={isThisMonth(baseDate)} onClick={() => setBaseDate((prev) => nextMonth(prev))}>
            <ArrowForwardIosOutlined />
          </IconButton>
          <Spacer />
          <UserAvatarList users={calendar?.users || []} />
        </Box>
        <Calendar baseDate={baseDate} onClickDate={(date) => onClickAddButton(date)} />
      </Box>
    </>
  );
};
