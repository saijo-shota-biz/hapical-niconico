import { EmotionHeatMapEmpty } from '@domain/EmotionHeatMapEmpty';
import { EmotionHeatMapOfCalendar } from '@domain/EmotionHeatMapOfCalendar';
import { EmotionHeatMapOfUser } from '@domain/EmotionHeatMapOfUser';
import { useDate } from '@hooks/util/useDate';
import { Box, SxProps } from '@mui/material';
import { Table } from '@ui/table/Table';
import { TableBody } from '@ui/table/TableBody';
import { TableCell } from '@ui/table/TableCell';
import { TableHead } from '@ui/table/TableHead';
import { TableRow } from '@ui/table/TableRow';
import { Label } from '@ui/typography/Label';
import { FC, VFC } from 'react';

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

export const EmotionHeatMapIcon: FC = ({ children }) => (
  <TableCell
    sx={{
      position: 'sticky',
      left: 0,
      backgroundColor: 'common.white',
      marginX: 1,
      minWidth: '40px',
      minHeight: '40px',
      border: 'none',
    }}
  >
    {children}
  </TableCell>
);

export const EmotionHeatMapCell: FC<{ backgroundColor?: string }> = ({ children, backgroundColor }) => (
  <TableCell
    sx={{
      minWidth: '40px',
      minHeight: '40px',
      border: '1px solid',
      borderColor: 'grey.200',
      borderCollapse: 'collapse',
      flexShrink: 0,
      textAlign: 'center',
      ...(backgroundColor ? { backgroundColor } : {}),
    }}
  >
    {children}
  </TableCell>
);

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
    <Box
      sx={{
        overflowX: 'auto',
        backgroundColor: 'common.white',
        paddingY: 2,
        border: 'solid 1px',
        borderColor: 'grey.200',
        ...sx,
      }}
    >
      <Table sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <EmotionHeatMapIcon />
            {getDateList(startDate, endDate).map((date, i) => (
              <EmotionHeatMapCell key={date.toISOString()}>
                <Label>{date.getDate() === 1 || i === 0 ? formatMd(date) : `${date.getDate()}`.padStart(2, '0')}</Label>
              </EmotionHeatMapCell>
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
    </Box>
  );
};
