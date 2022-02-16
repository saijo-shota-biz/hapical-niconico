import { CalendarQueryResult, CalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import { useDate } from '@hooks/util/useDate';
import { LoginUserState } from '@hooks/util/useLoginUser';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';

import { firestore } from '@/firebase';
import { CalendarReport } from '@/types/Calendar';

export const CalendarReportsQuery = selector<CalendarReport[]>({
  key: 'QueryCalendarReports',
  get: async ({ get }) => {
    const { calendarId, start, end } = get(CalendarQueryState);
    if (!calendarId || !start || !end) {
      return [];
    }

    const calendarReportsCollectionRef = collection(firestore, 'calendar-reports');
    const wheres = [];
    wheres.push(where('date', '>=', start));
    wheres.push(where('date', '<=', end));
    const q = query(
      calendarReportsCollectionRef,
      where('calendarId', '==', calendarId),
      ...wheres,
      orderBy('date'),
      orderBy('userId')
    );
    const calendarReportsDocs = await getDocs(q);
    const reports: CalendarReport[] = [];
    calendarReportsDocs.forEach((report) =>
      reports.push({ uid: report.id, ...report.data(), date: report.get('date').toDate() } as CalendarReport)
    );
    return reports;
  },
});

export type CalendarState = CalendarQueryResult & {
  reports: CalendarReport[];
};

export const CalendarQuery = selector<CalendarState | null>({
  key: 'QueryCalendar',
  get: async ({ get }) => {
    const loginUser = get(LoginUserState);
    if (!loginUser) {
      return null;
    }

    const { calendarId } = get(CalendarQueryState);
    if (!calendarId) {
      return null;
    }

    const calendar = get(CalendarsQuery).find((c) => c.uid === calendarId);
    if (!calendar) {
      return null;
    }

    const reports = get(CalendarReportsQuery);

    return {
      ...calendar,
      reports,
    };
  },
});

type CalendarQueryStateType = {
  calendarId: string;
  start: Date | null;
  end: Date | null;
};

const CalendarQueryState = atom<CalendarQueryStateType>({
  key: 'StateCalendarQuery',
  default: {
    calendarId: '',
    start: null,
    end: null,
  },
});

export const useCalendarQuery = () => {
  const calendar = useRecoilValue(CalendarQuery);
  const setQuery = useSetRecoilState(CalendarQueryState);

  const { getRangeYear, getRangeMonth, getRangeWeek } = useDate();

  const setQueryCalendarId = (calendarId: string) => {
    const today = new Date();
    setQuery({
      calendarId,
      ...getRangeMonth(today.getFullYear(), today.getMonth()),
    });
  };

  const setQueryYear = (baseDate: Date) => {
    setQuery((prev) => ({ ...prev, ...getRangeYear(baseDate.getFullYear()) }));
  };

  const setQueryMonth = (baseDate: Date) => {
    setQuery((prev) => ({ ...prev, ...getRangeMonth(baseDate.getFullYear(), baseDate.getMonth()) }));
  };

  const setQueryWeek = (baseDate: Date) => {
    setQuery((prev) => ({ ...prev, ...getRangeWeek(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate()) }));
  };

  const setQueryDateRange = (start: Date, end: Date) => {
    setQuery((prev) => ({ ...prev, start, end }));
  };

  return { calendar, setQueryCalendarId, setQueryYear, setQueryMonth, setQueryWeek, setQueryDateRange };
};
