import { CalendarsQuery, CalendarsQueryResult } from '@hooks/domain/query/useCalendarsQuery';
import { CalendarQueryCalendarIdState } from '@hooks/domain/query/useCurrentCalendarId';
import { LoginUserState } from '@hooks/util/useLoginUser';
import { selector, useRecoilValue } from 'recoil';

import { CalendarReport } from '@/types/Calendar';

export type CalendarQueryResult = CalendarsQueryResult & {
  reports: CalendarReport[];
};

export const CalendarQuery = selector<CalendarsQueryResult | null>({
  key: 'QueryCalendar',
  get: async ({ get }) => {
    const loginUser = get(LoginUserState);
    if (!loginUser) {
      return null;
    }

    const calendarId = get(CalendarQueryCalendarIdState);
    if (!calendarId) {
      return null;
    }

    const calendar = get(CalendarsQuery).find((c) => c.uid === calendarId);
    if (!calendar) {
      return null;
    }

    return calendar;
  },
});

export const useCalendarQuery = () => {
  const calendar = useRecoilValue(CalendarQuery);

  return { calendar };
};
