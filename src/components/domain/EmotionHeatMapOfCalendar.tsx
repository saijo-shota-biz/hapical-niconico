import { EmotionHeatMapCell, EmotionHeatMapIcon } from '@domain/EmotionHeatMap';
import { useDate } from '@hooks/util/useDate';
import { useEmotion } from '@hooks/util/useEmotion';
import { useRouter } from '@hooks/util/useRouter';
import { CalendarToday } from '@mui/icons-material';
import { IconButton, SxProps, Tooltip } from '@mui/material';
import { TableRow } from '@ui/table/TableRow';
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
          <EmotionHeatMapIcon>
            <Tooltip title={calendar.name} placement={'top'} arrow>
              <IconButton onClick={() => push(`/calendars/${calendar.uid}`)} sx={{ width: '40px', height: '40px' }}>
                <CalendarToday />
              </IconButton>
            </Tooltip>
          </EmotionHeatMapIcon>
          {dateList.map((date) => {
            const report = reports.find((report) => report.calendarId === calendar.uid && isSameYmd(date, report.date));
            return (
              <EmotionHeatMapCell
                key={date.toISOString()}
                backgroundColor={(report && getEmotionIconColor(report.emotion)) || ''}
              />
            );
          })}
        </TableRow>
      ))}
    </>
  );
};
