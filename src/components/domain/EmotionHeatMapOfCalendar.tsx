import { useDate } from '@hooks/util/useDate';
import { useEmotion } from '@hooks/util/useEmotion';
import { useRouter } from '@hooks/util/useRouter';
import { CalendarToday } from '@mui/icons-material';
import { IconButton, SxProps, TableCell, TableRow, Tooltip } from '@mui/material';
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
        <TableRow key={calendar.uid}>
          <TableCell
            sx={{
              position: 'sticky',
              left: 0,
              backgroundColor: 'common.white',
              marginX: 1,
              width: '40px',
              height: '40px',
              border: 'none',
              padding: 1,
            }}
          >
            <Tooltip title={calendar.name} placement={'top'} arrow>
              <IconButton onClick={() => push(`/calendars/${calendar.uid}`)} sx={{ width: '40px', height: '40px' }}>
                <CalendarToday />
              </IconButton>
            </Tooltip>
          </TableCell>
          {dateList.map((date) => {
            const report = reports.find((report) => report.calendarId === calendar.uid && isSameYmd(date, report.date));
            return (
              <TableCell
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
        </TableRow>
      ))}
    </>
  );
};
