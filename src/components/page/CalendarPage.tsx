import { Calendar } from '@domain/Calendar';
import { ReportAddModal } from '@domain/ReportAddModal';
import { useReportAddModal } from '@hooks/components/useReportAddModal';
import { useCalendarCommand } from '@hooks/domain/command/useCalendarCommand';
import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { useDate } from '@hooks/util/useDate';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { useRouter } from '@hooks/util/useRouter';
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined, Add } from '@mui/icons-material';
import { Box, Fab, IconButton } from '@mui/material';
import { Breadcrumbs } from '@ui/breadcrumbs/Breadcrumbs';
import { CalendarBreadcrumbs, CalendarsBreadcrumbs, HomeBreadcrumbs } from '@ui/breadcrumbs/breadcrumbsLinks';
import { Label } from '@ui/typography/Label';
import { useEffect, useState, VFC } from 'react';

export const CalendarPage: VFC = () => {
  const {
    params: { calendarId = '' },
  } = useRouter();
  const { loginUser } = useLoginUser();

  const [baseDate, setBaseDate] = useState(new Date());
  const { parseDateFromString, formatYm, nextMonth, prevMonth, isThisMonth } = useDate();

  const { calendar, setQueryCalendarId, setQueryMonth } = useCalendarQuery();
  const { addReport } = useCalendarCommand();

  useEffect(() => {
    setQueryCalendarId(calendarId);
  }, [calendarId]);

  useEffect(() => {
    setQueryMonth(baseDate.getFullYear(), baseDate.getMonth());
  }, [baseDate]);

  const breadcrumbs = [HomeBreadcrumbs(), CalendarsBreadcrumbs(), CalendarBreadcrumbs(calendar?.name, calendarId)];

  const { showReportAddModal, closeReportAddModal } = useReportAddModal();
  const onClickAddButton = async () => {
    const result = await showReportAddModal();
    if (result) {
      const date = parseDateFromString(result.date);
      await addReport({
        calendarId: calendar?.uid || '',
        userId: loginUser?.uid || '',
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        emotion: result.emotion,
        comment: result.comment,
      });
      closeReportAddModal();
    }
  };
  useEffect(() => {
    return () => closeReportAddModal();
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Box sx={{ padding: 2, flexGrow: 1, flexBasis: 0, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ paddingY: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
            <IconButton onClick={() => setBaseDate((prev) => prevMonth(prev))}>
              <ArrowBackIosNewOutlined />
            </IconButton>
            <Label size={'lg'}>{formatYm(baseDate)}</Label>
            <IconButton disabled={isThisMonth(baseDate)} onClick={() => setBaseDate((prev) => nextMonth(prev))}>
              <ArrowForwardIosOutlined />
            </IconButton>
          </Box>
          <Calendar baseDate={baseDate} />
        </Box>
      </Box>
      <Fab
        color="primary"
        size={'medium'}
        sx={{ position: 'absolute', bottom: '32px', right: '32px' }}
        onClick={onClickAddButton}
      >
        <Add />
      </Fab>
      <ReportAddModal />
    </>
  );
};
