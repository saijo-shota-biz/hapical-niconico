import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
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
  const { setQueryCalendarId } = useCalendarQuery();

  useEffect(() => {
    if (!calendarId) {
      pushOrRedirectUrl('/calendars');
      return;
    }
    const calendar = calendars.find((e) => e.uid === calendarId);
    if (calendar) {
      setQueryCalendarId(calendarId);
    } else {
      pushOrRedirectUrl('/calendars');
    }
  }, [calendarId]);

  return <Outlet />;
};
