import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { Box } from '@mui/material';
import { PrivateCalendarPage } from '@page/PrivateCalendarPage';
import { SharedCalendarPage } from '@page/SharedCalendarPage';
import { VFC } from 'react';

export const CalendarPageContent: VFC = () => {
  const { calendar } = useCalendarQuery();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      {calendar && calendar.shared ? <SharedCalendarPage /> : <PrivateCalendarPage />}
    </Box>
  );
};
