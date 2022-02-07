import { CalendarAddModal } from '@domain/CalendarAddModal';
import { useCalendarAddModal } from '@hooks/components/useCalendarAddModal';
import { useCalendarCommand } from '@hooks/domain/command/useCalendarCommand';
import { useCalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { useRouter } from '@hooks/util/useRouter';
import { Add, CalendarToday, Settings } from '@mui/icons-material';
import { Avatar, AvatarGroup, Box, Fab, IconButton, Tooltip } from '@mui/material';
import { Breadcrumbs } from '@ui/breadcrumbs/Breadcrumbs';
import { CalendarsBreadcrumbs, HomeBreadcrumbs } from '@ui/breadcrumbs/breadcrumbsLinks';
import { Card } from '@ui/card/Card';
import { CardContent } from '@ui/card/CardContent';
import { Label } from '@ui/typography/Label';
import { Spacer } from '@ui/utils/Spacer';
import { VFC, MouseEvent, useEffect } from 'react';

export const CalendarsPage: VFC = () => {
  const { push } = useRouter();

  const breadcrumbs = [HomeBreadcrumbs(), CalendarsBreadcrumbs()];

  const { calendars } = useCalendarsQuery();
  const { showCalendarAddModal, closeCalendarAddModal } = useCalendarAddModal();
  const { create } = useCalendarCommand();
  const { loginUser } = useLoginUser();

  const onClickSettingIcon = (event: MouseEvent, calendarId: string) => {
    event.stopPropagation();
    push(`/calendars/${calendarId}/settings`);
  };

  const onClickAddButton = async () => {
    const result = await showCalendarAddModal();
    if (result && loginUser) {
      await create(loginUser, result.name);
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
        <Box sx={{ padding: 2, flexGrow: 1, flexBasis: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {calendars.map((calendar) => (
            <Card key={calendar.uid} sx={{ cursor: 'pointer' }} onClick={() => push(`/calendars/${calendar.uid}`)}>
              <CardContent sx={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CalendarToday />
                  <Label>{calendar.name}</Label>
                </Box>
                <Box>
                  <AvatarGroup
                    max={11}
                    spacing={'medium'}
                    sx={{
                      justifyContent: 'start',
                      '> .MuiAvatarGroup-avatar': {
                        width: '32px',
                        height: '32px',
                        fontSize: '16px',
                      },
                    }}
                  >
                    {calendar.users.map((e) => (
                      <Tooltip key={e.uid} title={e.name} placement={'top-start'}>
                        <Avatar alt={e.name} src={e.picture} sx={{ width: 24, height: 24 }} />
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                </Box>
                <Spacer />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IconButton onClick={(e) => onClickSettingIcon(e, calendar.uid)}>
                    <Settings />
                  </IconButton>
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
