import { useDate } from '@hooks/util/useDate';
import { useEmotion } from '@hooks/util/useEmotion';
import { useRouter } from '@hooks/util/useRouter';
import { CalendarToday } from '@mui/icons-material';
import { Box, IconButton, SxProps, Tooltip } from '@mui/material';
import { VFC } from 'react';

import { Calendar, CalendarReport } from '@/types/Calendar';

type Props = {
  startDate: Date;
  endDate: Date;
  reports: CalendarReport[];
  calendars: Calendar[];
  sx?: SxProps;
};

export const EmotionHeatMapOfCalendar: VFC<Props> = ({ startDate, endDate, reports, calendars, sx = {} }) => {
  const { getDateList } = useDate();
  const { isSameYmd } = useDate();
  const { getEmotionIconColor } = useEmotion();
  const { push } = useRouter();

  const dateList = getDateList(startDate, endDate);

  return (
    <>
      {calendars.map((calendar) => (
        <Box key={calendar.uid} sx={{ display: 'flex' }}>
          <Box sx={{ position: 'sticky', left: 0, backgroundColor: 'common.white' }}>
            <Tooltip title={calendar.name} placement={'top'} arrow>
              <IconButton
                onClick={() => push(`/calendars/${calendar.uid}`)}
                sx={{ width: '40px', height: '40px', marginRight: 1 }}
              >
                <CalendarToday />
              </IconButton>
            </Tooltip>
          </Box>
          {dateList.map((date) => {
            const report = reports.find((report) => report.calendarId === calendar.uid && isSameYmd(date, report.date));
            return (
              <Box
                key={date.toISOString()}
                sx={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderCollapse: 'collapse',
                  flexShrink: 0,
                  ...(report ? { backgroundColor: getEmotionIconColor(report.emotion) } : {}),
                }}
              />
            );
          })}
        </Box>
      ))}
    </>
  );
};
