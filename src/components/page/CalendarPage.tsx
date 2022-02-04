import { useDate } from '@hooks/util/useDate';
import { useRouter } from '@hooks/util/useRouter';
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined, Add } from '@mui/icons-material';
import { Box, Fab, IconButton } from '@mui/material';
import { Breadcrumbs } from '@ui/breadcrumbs/Breadcrumbs';
import { CalendarBreadcrumbs, CalendarsBreadcrumbs, HomeBreadcrumbs } from '@ui/breadcrumbs/breadcrumbsLinks';
import { Calendar } from '@ui/calendar/Calendar';
import { Label } from '@ui/typography/Label';
import { useState, VFC } from 'react';

export const CalendarPage: VFC = () => {
  const {
    params: { calendarId = '' },
  } = useRouter();

  const [baseDate, setBaseDate] = useState(new Date());
  const { formatYm, nextMonth, prevMonth, isThisMonth } = useDate();

  const breadcrumbs = [HomeBreadcrumbs(), CalendarsBreadcrumbs(), CalendarBreadcrumbs('saijo', calendarId)];

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Box sx={{ padding: 2, flexGrow: 1, flexBasis: 0, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ paddingY: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
            <IconButton onClick={() => setBaseDate((prev) => prevMonth(baseDate))}>
              <ArrowBackIosNewOutlined />
            </IconButton>
            <Label size={'lg'}>{formatYm(baseDate)}</Label>
            <IconButton disabled={isThisMonth(baseDate)} onClick={() => setBaseDate((prev) => nextMonth(baseDate))}>
              <ArrowForwardIosOutlined />
            </IconButton>
          </Box>
          <Calendar baseDate={baseDate} />
        </Box>
      </Box>
      <Fab color="primary" size={'medium'} sx={{ position: 'absolute', bottom: '32px', right: '32px' }}>
        <Add />
      </Fab>
    </>
  );
};
