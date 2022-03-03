import { EmotionHeatMap } from '@domain/EmotionHeatMap';
import { ReportAddModal } from '@domain/ReportAddModal';
import { ReportList } from '@domain/ReportList';
import { useDateRangePicker } from '@hooks/components/useDateRangePicker';
import { useReportAddModal } from '@hooks/components/useReportAddModal';
import { useCalendarCommand } from '@hooks/domain/command/useCalendarCommand';
import { useCalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import { useMyReportsQuery } from '@hooks/domain/query/useMyReportsQuery';
import { useDate } from '@hooks/util/useDate';
import { useEmotion } from '@hooks/util/useEmotion';
import { useHandler } from '@hooks/util/useHandler';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { Box, useMediaQuery } from '@mui/material';
import { Breadcrumbs } from '@ui/breadcrumbs/Breadcrumbs';
import { CalendarBreadcrumbs, HomeBreadcrumbs } from '@ui/breadcrumbs/breadcrumbsLinks';
import { FloatingButton } from '@ui/button/FloatingButton';
import { Card } from '@ui/card/Card';
import { CardContent } from '@ui/card/CardContent';
import { DateRangePicker } from '@ui/input/InputDateRange';
import { useEffect, VFC } from 'react';

import { CalendarReport } from '@/types/Calendar';

export const HomePage: VFC = () => {
  const { loginUser } = useLoginUser();
  const { calendars } = useCalendarsQuery();
  const breadcrumbs = [HomeBreadcrumbs('current'), CalendarBreadcrumbs(calendars[0].uid, calendars[0].name, 'next')];

  const { reports } = useMyReportsQuery();
  const { parseDateFromString } = useDate();

  const { getEmotionIconColor } = useEmotion();

  const { startDate, setStartDate, endDate, setEndDate } = useDateRangePicker();

  const reportFilter = (report: CalendarReport) => {
    console.log({
      date: report.date,
      startDate,
      endDate,
    });
    return startDate.getTime() <= report.date.getTime() && report.date.getTime() <= endDate.getTime();
  };

  const { showReportAddModal, closeReportAddModal } = useReportAddModal();
  const { handleAsyncEvent } = useHandler();
  const { addReport } = useCalendarCommand();
  const onClickReportAddModalButton = handleAsyncEvent(async () => {
    const result = await showReportAddModal();
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

  const smartPhone = useMediaQuery('(max-width:600px)');
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Card sx={{ margin: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', flexDirection: smartPhone ? 'column' : 'row', gap: 2, marginTop: 2 }}>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onChangeStartDate={setStartDate}
              onChangeEndDate={setEndDate}
              batches={reports.map((e) => ({ date: e.date, color: getEmotionIconColor(e.emotion) }))}
            />
            {loginUser && <ReportList reports={reports.filter(reportFilter)} users={[loginUser]} />}
          </Box>
          {calendars && (
            <EmotionHeatMap
              startDate={startDate}
              endDate={endDate}
              reports={reports.filter(reportFilter)}
              calendars={calendars}
              sx={{ marginTop: 2 }}
            />
          )}
        </CardContent>
      </Card>
      <FloatingButton onClick={onClickReportAddModalButton} />
      <ReportAddModal calendarSelectable />
    </>
  );
};
