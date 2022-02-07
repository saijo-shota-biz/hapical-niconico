import { CalendarAddModal } from '@domain/CalendarAddModal';
import { CalendarPageIconButton } from '@domain/CalendarPageIconButton';
import { ReportPageIconButton } from '@domain/ReportPageIconButton';
import { SettingsPageIconButton } from '@domain/SettingsPageIconButton';
import { UserAvatarList } from '@domain/UserAvatarList';
import { useCalendarAddModal } from '@hooks/components/useCalendarAddModal';
import { useCalendarCommand } from '@hooks/domain/command/useCalendarCommand';
import { useCalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { Add, CalendarToday } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';
import { Breadcrumbs } from '@ui/breadcrumbs/Breadcrumbs';
import { CalendarsBreadcrumbs, HomeBreadcrumbs } from '@ui/breadcrumbs/breadcrumbsLinks';
import { Card } from '@ui/card/Card';
import { CardContent } from '@ui/card/CardContent';
import { Label } from '@ui/typography/Label';
import { Spacer } from '@ui/utils/Spacer';
import { useEffect, VFC } from 'react';

export const CalendarsPage: VFC = () => {
  const breadcrumbs = [HomeBreadcrumbs(), CalendarsBreadcrumbs()];

  const { calendars } = useCalendarsQuery();
  const { showCalendarAddModal, closeCalendarAddModal } = useCalendarAddModal();
  const { createCalendar } = useCalendarCommand();
  const { loginUser } = useLoginUser();

  const onClickAddButton = async () => {
    const result = await showCalendarAddModal();
    if (result && loginUser) {
      await createCalendar(loginUser, result.name);
      closeCalendarAddModal();
    }
  };

  useEffect(() => {
    return () => closeCalendarAddModal();
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Box sx={{ padding: 2, flexGrow: 1, flexBasis: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
      </Box>
      <Fab
        color="primary"
        size={'medium'}
        sx={{ position: 'absolute', bottom: '32px', right: '32px' }}
        onClick={onClickAddButton}
      >
        <Add />
      </Fab>
      <CalendarAddModal />
    </>
  );
};
