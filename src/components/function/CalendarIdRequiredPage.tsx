import { useCalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import { useCurrentCalendarId } from '@hooks/domain/query/useCurrentCalendarId';
import { useRouter } from '@hooks/util/useRouter';
import { useEffect, VFC } from 'react';
import { Outlet } from 'react-router-dom';

export const CalendarIdRequiredPage: VFC = () => {
  const {
    params: { calendarId = '' },
    pushOrRedirectUrl,
  } = useRouter();

  const { calendars } = useCalendarsQuery();

  const { setQueryCalendarId } = useCurrentCalendarId();

  useEffect(() => {
    if (!calendarId) {
      pushOrRedirectUrl('/');
      return;
    }
    const calendar = calendars.find((e) => e.uid === calendarId);
    if (!calendar) {
      pushOrRedirectUrl('/');
      return;
    }
    setQueryCalendarId(calendarId);
  }, [calendarId]);

  return <Outlet />;
};
