import { EmotionHeatMap } from '@domain/EmotionHeatMap';
import { ReportList } from '@domain/ReportList';
import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { Box, useMediaQuery } from '@mui/material';
import { DateRangePicker } from '@ui/input/InputDateRange';
import { Dispatch, SetStateAction, VFC } from 'react';

type Props = {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
};

export const CalendarPageReportTab: VFC<Props> = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const { calendar } = useCalendarQuery();

  const smartPhone = useMediaQuery('(max-width:600px)');
  return (
    <>
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: smartPhone ? 'column' : 'row',
            gap: 2,
          }}
        >
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
