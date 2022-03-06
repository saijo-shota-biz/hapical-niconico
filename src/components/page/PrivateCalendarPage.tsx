import { CalendarAddModal } from '@domain/modal/CalendarAddModal';
import { ReportAddModal } from '@domain/modal/ReportAddModal';
import { CalendarView } from '@domain/view/CalendarView';
import { ListView } from '@domain/view/ListView';
import { Suspense } from '@function/Suspense';
import { useCalendarReportsQueryDate } from '@hooks/domain/query/useCalendarReportsQueryDate';
import { useDate } from '@hooks/util/useDate';
import { useRouter } from '@hooks/util/useRouter';
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
  CalendarToday,
  Settings,
  ViewList,
} from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Label } from '@ui/typography/Label';
import { Spacer } from '@ui/utils/Spacer';
import { useEffect, useState, VFC } from 'react';

export const PrivateCalendarPage: VFC = () => {
  const {
    params: { calendarId = '' },
    push,
  } = useRouter();
  const { setQueryMonth } = useCalendarReportsQueryDate();

  const today = new Date();
  const [baseDate, setBaseDate] = useState(today);

  const [viewType, setViewType] = useState<1 | 2>(1);

  useEffect(() => {
    setQueryMonth(baseDate);
  }, [baseDate]);

  const { formatYm, nextMonth, prevMonth, isThisMonth } = useDate();

  return (
    <Box sx={{ padding: 2, flexGrow: 1, flexBasis: 0, display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', paddingY: 1 }}>
        <IconButton onClick={() => setBaseDate((prev) => prevMonth(prev))}>
          <ArrowBackIosNewOutlined />
        </IconButton>
        <Label size={'lg'} sx={{ minWidth: '68px' }}>
          {formatYm(baseDate)}
        </Label>
        <IconButton disabled={isThisMonth(baseDate)} onClick={() => setBaseDate((prev) => nextMonth(prev))}>
          <ArrowForwardIosOutlined />
        </IconButton>
        <Tooltip title={'カレンダービュー'} arrow placement={'top'}>
          <IconButton onClick={() => setViewType(1)} color={viewType === 1 ? 'secondary' : undefined}>
            <CalendarToday />
          </IconButton>
        </Tooltip>
        <Tooltip title={'リストビュー'} arrow placement={'top'}>
          <IconButton onClick={() => setViewType(2)} color={viewType === 2 ? 'secondary' : undefined}>
            <ViewList />
          </IconButton>
        </Tooltip>
        <Spacer />
        <Tooltip title={'カレンダー設定'} arrow placement={'top'}>
          <IconButton onClick={() => push(`/calendars/${calendarId}/settings`)}>
            <Settings />
          </IconButton>
        </Tooltip>
      </Box>
      <Suspense>
        {viewType === 1 && <CalendarView baseDate={baseDate} />}
        {viewType === 2 && <ListView baseDate={baseDate} />}
        <ReportAddModal />
        <CalendarAddModal />
      </Suspense>
    </Box>
  );
};
