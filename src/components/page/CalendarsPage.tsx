import { CalendarAddModal } from '@domain/CalendarAddModal';
import { CalendarPageIconButton } from '@domain/CalendarPageIconButton';
import { ReportPageIconButton } from '@domain/ReportPageIconButton';
import { SettingsPageIconButton } from '@domain/SettingsPageIconButton';
import { UserAvatarList } from '@domain/UserAvatarList';
import { useCalendarAddModal } from '@hooks/components/useCalendarAddModal';
import { useCalendarCommand } from '@hooks/domain/command/useCalendarCommand';
import { useCalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import { useHandler } from '@hooks/util/useHandler';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { CalendarToday } from '@mui/icons-material';
import { Box } from '@mui/material';
import { Breadcrumbs } from '@ui/breadcrumbs/Breadcrumbs';
import { CalendarsBreadcrumbs, HomeBreadcrumbs } from '@ui/breadcrumbs/breadcrumbsLinks';
import { FloatingButton } from '@ui/button/FloatingButton';
import { Card } from '@ui/card/Card';
import { CardContent } from '@ui/card/CardContent';
import { Label } from '@ui/typography/Label';
import { Spacer } from '@ui/utils/Spacer';
import { useEffect, VFC } from 'react';

export const CalendarsPage: VFC = () => {
  const { loginUser } = useLoginUser();
  const breadcrumbs = [HomeBreadcrumbs(), CalendarsBreadcrumbs('current')];

  const { handleAsyncEvent } = useHandler();

  const { calendars } = useCalendarsQuery();

  const { showCalendarAddModal, closeCalendarAddModal } = useCalendarAddModal();
  const { createCalendar } = useCalendarCommand();
  const onClickAddButton = handleAsyncEvent(async () => {
    const result = await showCalendarAddModal();
    if (result && loginUser) {
      await createCalendar(loginUser, result.name);
      closeCalendarAddModal();
    }
  });

  useEffect(() => {
    return () => closeCalendarAddModal();
  }, []);

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Box sx={{ padding: 2, flexGrow: 1, flexBasis: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {calendars.length === 0 && <Box>カレンダーがありません。作成してください。</Box>}
        {calendars.map((calendar) => (
          <Card key={calendar.uid}>
            <CardContent sx={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarToday />
                <Label>{calendar.name}</Label>
              </Box>
              <Spacer />
              <UserAvatarList users={calendar.users} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CalendarPageIconButton calendarId={calendar.uid} />
                <ReportPageIconButton calendarId={calendar.uid} />
                <SettingsPageIconButton calendarId={calendar.uid} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <FloatingButton onClick={onClickAddButton} />
      <CalendarAddModal />
    </>
  );
};
