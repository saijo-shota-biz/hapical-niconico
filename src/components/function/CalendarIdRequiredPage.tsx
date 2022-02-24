import { useCalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import { useRouter } from '@hooks/util/useRouter';
import { useEffect, VFC } from 'react';
import { Outlet } from 'react-router-dom';

export const CalendarIdRequiredPage: VFC = () => {
  const {
    params: { calendarId = '' },
    pushOrRedirectUrl,
  } = useRouter();

  const { calendars } = useCalendarsQuery();

  useEffect(() => {
    if (!calendarId) {
      pushOrRedirectUrl('/');
      return;
    }
    const calendar = calendars.find((e) => e.uid === calendarId);
    if (!calendar) {
      pushOrRedirectUrl('/');
    }
  }, [calendarId]);

  return <Outlet />;
};
