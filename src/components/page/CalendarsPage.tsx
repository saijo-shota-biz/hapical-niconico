import { useCalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import { Box, Link } from '@mui/material';
import { Breadcrumbs } from '@ui/breadcrumbs/Breadcrumbs';
import { CalendarsBreadcrumbs, HomeBreadcrumbs } from '@ui/breadcrumbs/breadcrumbsLinks';
import { VFC } from 'react';

export const CalendarsPage: VFC = () => {
  const { calendars } = useCalendarsQuery();
  const breadcrumbs = [HomeBreadcrumbs(), CalendarsBreadcrumbs()];
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Box sx={{ padding: 2, flexGrow: 1, flexBasis: 0, display: 'flex', flexDirection: 'column' }}>
          {calendars.map((calendar) => (
            <Link key={calendar.uid} href={`/calendars/${calendar.uid}`}>
              {calendar.name}
            </Link>
          ))}
        </Box>
      </Box>
    </>
  );
};
