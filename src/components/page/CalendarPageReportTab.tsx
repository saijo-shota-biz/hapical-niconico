import { EmotionHeatMap } from '@domain/EmotionHeatMap';
import { ReportList } from '@domain/ReportList';
import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { useDate } from '@hooks/util/useDate';
import { Box, useMediaQuery } from '@mui/material';
import { DateRangePicker } from '@ui/input/InputDateRange';
import { useEffect, useState, VFC } from 'react';

export const CalendarPageReportTab: VFC = () => {
  const { calendar, setQueryDateRange } = useCalendarQuery();

  const { getRangeWeek } = useDate();
  const today = new Date();
  const { start, end } = getRangeWeek(today.getFullYear(), today.getMonth(), today.getDate());
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  useEffect(() => {
    setQueryDateRange(startDate, endDate);
  }, [startDate, endDate]);

  const smartPhone = useMediaQuery('(max-width:600px)');
  return (
    <>
      <Box
        sx={{ padding: 2, display: 'flex', flexDirection: 'column', ...(smartPhone ? { alignItems: 'center' } : {}) }}
      >
        <Box sx={{ display: 'flex', flexDirection: smartPhone ? 'column' : 'row', gap: 2 }}>
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
            <EmotionHeatMap
              startDate={startDate}
              endDate={endDate}
              reports={calendar.reports}
              users={calendar.users}
              sx={{ marginTop: 2 }}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
