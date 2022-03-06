import { CalendarSettingIconButton } from '@domain/icon/CalendarSettingIconButton';
import { CalendarViewIconButton } from '@domain/icon/CalendarViewIconButton';
import { ListViewIconButton } from '@domain/icon/ListViewIconButton';
import { CalendarAddModal } from '@domain/modal/CalendarAddModal';
import { ReportAddModal } from '@domain/modal/ReportAddModal';
import { CalendarView } from '@domain/view/CalendarView';
import { ListView } from '@domain/view/ListView';
import { Suspense } from '@function/Suspense';
import { useCalendarReportsQueryDate } from '@hooks/domain/query/useCalendarReportsQueryDate';
import { useRouter } from '@hooks/util/useRouter';
import { Box } from '@mui/material';
import { InputMonth } from '@ui/input/InputMonth';
import { useEffect, useState, VFC } from 'react';

export const PrivateCalendarPage: VFC = () => {
  const {
    params: { calendarId = '' },
    push,
  } = useRouter();
  const { setQueryMonth } = useCalendarReportsQueryDate();

  const today = new Date();
  const [date, setDate] = useState(today);

  const [viewType, setViewType] = useState<1 | 2>(1);

  useEffect(() => {
    setQueryMonth(date);
  }, [date]);

  return (
    <Box sx={{ padding: 2, flexGrow: 1, flexBasis: 0, display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', paddingY: 1 }}>
        <InputMonth date={date} setDate={setDate} />
        <CalendarViewIconButton onClick={() => setViewType(1)} color={viewType === 1 ? 'secondary' : undefined} />
        <ListViewIconButton onClick={() => setViewType(2)} color={viewType === 2 ? 'secondary' : undefined} />
        <CalendarSettingIconButton onClick={() => push(`/calendars/${calendarId}/settings`)} />
      </Box>
      <Suspense>
        {viewType === 1 && <CalendarView baseDate={date} />}
        {viewType === 2 && <ListView baseDate={date} />}
        <ReportAddModal />
        <CalendarAddModal />
      </Suspense>
    </Box>
  );
};
