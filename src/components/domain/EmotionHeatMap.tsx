import { EmotionHeatMapEmpty } from '@domain/EmotionHeatMapEmpty';
import { EmotionHeatMapOfCalendar } from '@domain/EmotionHeatMapOfCalendar';
import { EmotionHeatMapOfUser } from '@domain/EmotionHeatMapOfUser';
import { useDate } from '@hooks/util/useDate';
import { Box, SxProps } from '@mui/material';
import { Label } from '@ui/typography/Label';
import { VFC } from 'react';

import { Calendar, CalendarReport } from '@/types/Calendar';
import { User } from '@/types/User';

type Props = {
  startDate: Date;
  endDate: Date;
  reports: CalendarReport[];
  calendars?: Calendar[];
  users?: User[];
  sx?: SxProps;
};

export const EmotionHeatMap: VFC<Props> = ({ startDate, endDate, reports, calendars, users, sx = {} }) => {
  const { formatYmd, formatMd } = useDate();
  const { getDateList } = useDate();

  if (reports.length === 0) {
    return (
      <Box sx={sx}>
        <EmotionHeatMapEmpty />
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', overflowX: 'auto', ...sx }}>
      {calendars && (
        <EmotionHeatMapOfCalendar startDate={startDate} endDate={endDate} reports={reports} calendars={calendars} />
      )}
      {users && <EmotionHeatMapOfUser startDate={startDate} endDate={endDate} reports={reports} users={users} />}
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            position: 'sticky',
            left: 0,
            backgroundColor: 'common.white',
          }}
        >
          <Box
            sx={{
              width: '40px',
              height: '40px',
              flexShrink: 0,
              marginRight: 1,
            }}
          />
        </Box>
        {getDateList(startDate, endDate).map((date, i) => (
          <Box
            key={date.toISOString()}
            sx={{
              width: '40px',
              border: '1px solid',
              borderColor: 'grey.200',
              borderCollapse: 'collapse',
              flexShrink: 0,
              writingMode: 'vertical-lr',
            }}
          >
            <Label>
              {date.getMonth() === 0 && date.getDate() === 1
                ? formatYmd(date)
                : date.getDate() === 1 || i === 0
                ? formatMd(date)
                : `${date.getDate()}`.padStart(2, '0')}
            </Label>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
