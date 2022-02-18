import { Calendar } from '@domain/Calendar';
import { ReportAddModal } from '@domain/ReportAddModal';
import { ReportPageIconButton } from '@domain/ReportPageIconButton';
import { SettingsPageIconButton } from '@domain/SettingsPageIconButton';
import { UserAvatarList } from '@domain/UserAvatarList';
import { useReportAddModal } from '@hooks/components/useReportAddModal';
import { useCalendarCommand } from '@hooks/domain/command/useCalendarCommand';
import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { useDate } from '@hooks/util/useDate';
import { useHandler } from '@hooks/util/useHandler';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { useRouter } from '@hooks/util/useRouter';
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { Breadcrumbs } from '@ui/breadcrumbs/Breadcrumbs';
import {
  CalendarBreadcrumbs,
  CalendarReportBreadcrumbs,
  CalendarsBreadcrumbs,
  HomeBreadcrumbs,
} from '@ui/breadcrumbs/breadcrumbsLinks';
import { FloatingButton } from '@ui/button/FloatingButton';
import { Label } from '@ui/typography/Label';
import { Spacer } from '@ui/utils/Spacer';
import { useEffect, useState, VFC } from 'react';

export const CalendarPage: VFC = () => {
  const {
    params: { calendarId = '' },
  } = useRouter();
  const { loginUser } = useLoginUser();

  const { calendar, setQueryMonth } = useCalendarQuery();
  const { addReport } = useCalendarCommand();

  const breadcrumbs = [
    HomeBreadcrumbs(),
    CalendarsBreadcrumbs(),
    CalendarBreadcrumbs(calendarId, calendar?.name, 'current'),
    CalendarReportBreadcrumbs(calendarId, 'next'),
  ];

  const { handleAsyncEvent } = useHandler();

  const [baseDate, setBaseDate] = useState(new Date());
  const { parseDateFromString, formatYm, nextMonth, prevMonth, isThisMonth } = useDate();

  useEffect(() => {
    setQueryMonth(baseDate);
  }, [baseDate]);

  const { showReportAddModal, closeReportAddModal } = useReportAddModal();
  const onClickAddButton = handleAsyncEvent(async (date: Date = new Date()) => {
    const result = await showReportAddModal(date);
    if (result) {
      const date = parseDateFromString(result.date);
      await addReport(
        {
          calendarId: calendar?.uid || '',
          userId: loginUser?.uid || '',
          date,
          emotion: result.emotion,
          comment: result.comment,
        },
        result.uid
      );
      closeReportAddModal();
    }
  });
  useEffect(() => {
    return () => closeReportAddModal();
  }, []);

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Box sx={{ padding: 2, flexGrow: 1, flexBasis: 0, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ paddingY: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
          <IconButton onClick={() => setBaseDate((prev) => prevMonth(prev))}>
            <ArrowBackIosNewOutlined />
          </IconButton>
          <Label size={'lg'}>{formatYm(baseDate)}</Label>
          <IconButton disabled={isThisMonth(baseDate)} onClick={() => setBaseDate((prev) => nextMonth(prev))}>
            <ArrowForwardIosOutlined />
          </IconButton>
          <Spacer />
          <UserAvatarList users={calendar?.users || []} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ReportPageIconButton calendarId={calendarId} />
            <SettingsPageIconButton calendarId={calendarId} />
          </Box>
        </Box>
        <Calendar baseDate={baseDate} onClickDate={(date) => onClickAddButton(date)} />
      </Box>
      <FloatingButton onClick={() => onClickAddButton()} />
      <ReportAddModal />
    </>
  );
};
