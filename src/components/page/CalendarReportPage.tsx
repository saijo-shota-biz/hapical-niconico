import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { useDate } from '@hooks/util/useDate';
import { useRouter } from '@hooks/util/useRouter';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Breadcrumbs } from '@ui/breadcrumbs/Breadcrumbs';
import {
  CalendarBreadcrumbs,
  CalendarReportBreadcrumbs,
  CalendarsBreadcrumbs,
  HomeBreadcrumbs,
} from '@ui/breadcrumbs/breadcrumbsLinks';
import { Card } from '@ui/card/Card';
import { CardContent } from '@ui/card/CardContent';
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
  const [displayType, setDisplayType] = useState<'yearly' | 'monthly' | 'weekly'>('weekly');
  const { start, end } = getRangeWeek(today.getFullYear(), today.getMonth(), today.getDate());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [startDate, setStartDate] = useState(start);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Card sx={{ margin: 2 }}>
          <CardContent>
            <Box>
              <ToggleButtonGroup
                color="primary"
                value={displayType}
                exclusive
                onChange={(_, v) => v && setDisplayType(v)}
              >
                <ToggleButton value="yearly">今年</ToggleButton>
                <ToggleButton value="monthly">今月</ToggleButton>
                <ToggleButton value="weekly">今週</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box></Box>
            <Box>{calendar && JSON.stringify(calendar.reports)}</Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
