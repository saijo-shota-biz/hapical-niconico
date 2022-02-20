import { EmotionHeatMapEmpty } from '@domain/EmotionHeatMapEmpty';
import { EmotionHeatMapOfCalendar } from '@domain/EmotionHeatMapOfCalendar';
import { EmotionHeatMapOfUser } from '@domain/EmotionHeatMapOfUser';
import { useDate } from '@hooks/util/useDate';
import { Box, SxProps, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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
  const { formatMd } = useDate();
  const { getDateList } = useDate();

  if (reports.length === 0) {
    return (
      <Box sx={sx}>
        <EmotionHeatMapEmpty />
      </Box>
    );
  }

  return (
    <TableContainer
      sx={{
        overflowX: 'auto',
        backgroundColor: 'common.white',
        paddingY: 2,
        border: 'solid 1px',
        borderColor: 'grey.200',
        ...sx,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
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
            />
            {getDateList(startDate, endDate).map((date, i) => (
              <TableCell
                key={date.toISOString()}
                sx={{
                  width: '40px',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderCollapse: 'collapse',
                  flexShrink: 0,
                }}
              >
                <Label>{date.getDate() === 1 || i === 0 ? formatMd(date) : `${date.getDate()}`.padStart(2, '0')}</Label>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {calendars && (
            <EmotionHeatMapOfCalendar startDate={startDate} endDate={endDate} reports={reports} calendars={calendars} />
          )}
          {users && <EmotionHeatMapOfUser startDate={startDate} endDate={endDate} reports={reports} users={users} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
