import { EmotionHeatMapOfCalendar } from '@domain/EmotionHeatMapOfCalendar';
import { ReportList } from '@domain/ReportList';
import { useDateRangePicker } from '@hooks/components/useDateRangePicker';
import { useCalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import { useMyReportsQuery } from '@hooks/domain/query/useMyReportsQuery';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { Box, useMediaQuery } from '@mui/material';
import { Breadcrumbs } from '@ui/breadcrumbs/Breadcrumbs';
import { CalendarsBreadcrumbs, HomeBreadcrumbs } from '@ui/breadcrumbs/breadcrumbsLinks';
import { Card } from '@ui/card/Card';
import { CardContent } from '@ui/card/CardContent';
import { DateRangePicker } from '@ui/input/InputDateRange';
import { useEffect, VFC } from 'react';

export const HomePage: VFC = () => {
  const { loginUser } = useLoginUser();

  const breadcrumbs = [HomeBreadcrumbs('current'), CalendarsBreadcrumbs('next')];

  const { calendars } = useCalendarsQuery();
  const { reports, setQueryDateRange } = useMyReportsQuery();

  const { startDate, setStartDate, endDate, setEndDate } = useDateRangePicker();

  useEffect(() => {
    setQueryDateRange(startDate, endDate);
  }, [startDate, endDate]);

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
            />
            {loginUser && <ReportList reports={reports} users={[loginUser]} />}
          </Box>
          {calendars && (
            <EmotionHeatMapOfCalendar
              startDate={startDate}
              endDate={endDate}
              reports={reports}
              calendars={calendars}
              sx={{ marginTop: 2 }}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};
