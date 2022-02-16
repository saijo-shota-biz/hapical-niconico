import { EmotionHeatMapOfUser } from '@domain/EmotionHeatMapOfUser';
import { ReportList } from '@domain/ReportList';
import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { useDate } from '@hooks/util/useDate';
import { useRouter } from '@hooks/util/useRouter';
import { Box } from '@mui/material';
import { Breadcrumbs } from '@ui/breadcrumbs/Breadcrumbs';
import {
  CalendarBreadcrumbs,
  CalendarReportBreadcrumbs,
  CalendarsBreadcrumbs,
  HomeBreadcrumbs,
} from '@ui/breadcrumbs/breadcrumbsLinks';
import { Card } from '@ui/card/Card';
import { CardContent } from '@ui/card/CardContent';
import { DateRangePicker } from '@ui/date-picker/DateRangePicker';
import { useEffect, useState, VFC } from 'react';

export const CalendarReportPage: VFC = () => {
  const {
    params: { calendarId = '' },
  } = useRouter();
  const { calendar, setQueryCalendarId, setQueryDateRange } = useCalendarQuery();
  useEffect(() => {
    setQueryCalendarId(calendarId);
  }, [calendarId]);

  const { getRangeWeek } = useDate();
  const today = new Date();
  const { start, end } = getRangeWeek(today.getFullYear(), today.getMonth(), today.getDate());
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  useEffect(() => {
    setQueryDateRange(startDate, endDate);
  }, [startDate, endDate]);

  const breadcrumbs = [
    HomeBreadcrumbs(),
    CalendarsBreadcrumbs(),
    CalendarBreadcrumbs(calendar?.name, calendarId),
    CalendarReportBreadcrumbs(calendarId),
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Card sx={{ margin: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onChangeStartDate={setStartDate}
              onChangeEndDate={setEndDate}
            />
            {calendar && <ReportList reports={calendar.reports} users={calendar.users} />}
          </Box>
          <Box>
            {calendar && (
              <EmotionHeatMapOfUser
                startDate={startDate}
                endDate={endDate}
                reports={calendar.reports}
                users={calendar.users}
                sx={{ marginTop: 2 }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
