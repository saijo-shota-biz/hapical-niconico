import { EmotionIcon } from '@domain/EmotionIcon';
import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { useDate } from '@hooks/util/useDate';
import { useRouter } from '@hooks/util/useRouter';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, ListSubheader } from '@mui/material';
import { Breadcrumbs } from '@ui/breadcrumbs/Breadcrumbs';
import {
  CalendarBreadcrumbs,
  CalendarReportBreadcrumbs,
  CalendarsBreadcrumbs,
  HomeBreadcrumbs,
} from '@ui/breadcrumbs/breadcrumbsLinks';
import { Card } from '@ui/card/Card';
import { CardContent } from '@ui/card/CardContent';
import { DatePicker } from '@ui/date-picker/DatePicker';
import { useEffect, useState, VFC } from 'react';

export const CalendarReportPage: VFC = () => {
  const {
    params: { calendarId = '' },
  } = useRouter();
  const { calendar, setQueryCalendarId, setQueryDateRange } = useCalendarQuery();
  useEffect(() => {
    setQueryCalendarId(calendarId);
  }, [calendarId]);

  const { getRangeWeek, formatYmd } = useDate();
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

  const getUser = (userId: string) => {
    return calendar?.users.find((user) => user.uid === userId);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Card sx={{ margin: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ display: 'flex', gap: 2 }}>
            <DatePicker
              startDate={startDate}
              endDate={endDate}
              onChangeStartDate={setStartDate}
              onChangeEndDate={setEndDate}
            />
            <List
              sx={{
                width: '100%',
                position: 'relative',
                overflow: 'auto',
                border: 'solid 1px',
                borderColor: 'grey.200',
                height: '458px',
                padding: 2,
                '& ul': { padding: 0 },
              }}
              subheader={<li />}
            >
              {Array.from(new Set(calendar?.reports.map((e) => e.date)))
                .sort((a, b) => (a > b ? -1 : 1))
                .map((date) => (
                  <li key={date.toISOString()}>
                    <ul>
                      <ListSubheader>{`${formatYmd(date)}`}</ListSubheader>
                      {calendar?.reports
                        .filter((report) => report.date === date)
                        .map((report) => (
                          <ListItem key={`${report.uid}`} alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar alt={getUser(report.userId)?.name} src={getUser(report.userId)?.picture} />
                            </ListItemAvatar>
                            <ListItemAvatar>
                              <EmotionIcon emotion={report.emotion} />
                            </ListItemAvatar>
                            <ListItemText primary={`${report.comment}`} />
                          </ListItem>
                        ))}
                    </ul>
                  </li>
                ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
