import { CalendarQueryResult, CalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import { useDate } from '@hooks/util/useDate';
import { LoginUserState } from '@hooks/util/useLoginUser';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

import { firestore } from '@/firebase';
import { CalendarReport } from '@/types/Calendar';

export const CalendarReportsQuery = selector<CalendarReport[]>({
  key: 'QueryCalendarReports',
  get: async ({ get }) => {
    const calendarId = get(CalendarQueryCalendarIdState);
    const { start, end } = get(CalendarQueryDateState);
    if (!calendarId || !start || !end) {
      console.log('QueryCalendarReports', []);
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
    console.log('QueryCalendarReports', reports);
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
      console.log('QueryCalendar', null);
      return null;
    }

    const calendarId = get(CalendarQueryCalendarIdState);
    if (!calendarId) {
      console.log('QueryCalendar', null);
      return null;
    }

    const calendar = get(CalendarsQuery).find((c) => c.uid === calendarId);
    if (!calendar) {
      console.log('QueryCalendar', null);
      return null;
    }

    const { start, end } = get(CalendarQueryDateState);
    let reports: CalendarReport[] = [];
    if (start && end) {
      reports = get(CalendarReportsQuery);
    }
    const result = {
      ...calendar,
      reports,
    };
    console.log('QueryCalendar', result);
    return result;
  },
});

export const CalendarQueryCalendarIdState = atom<string>({
  key: 'StateCalendarQueryCalendarId',
  default: '',
});

export const CalendarQueryDateState = atom<{ start: Date | null; end: Date | null }>({
  key: 'StateCalendarQueryDate',
  default: {
    start: null,
    end: null,
  },
});

export const useCalendarQuery = () => {
  const calendar = useRecoilValue(CalendarQuery);
  const [calendarIdQuery, setCalendarIdQuery] = useRecoilState(CalendarQueryCalendarIdState);
  const [dateQuery, setDateQuery] = useRecoilState(CalendarQueryDateState);

  const { getRangeYear, getRangeMonth, getRangeWeek, isSameYmd } = useDate();

  const setQueryCalendarId = (calendarId: string) => {
    if (calendarIdQuery && calendarIdQuery === calendarId) {
      return;
    }
    setCalendarIdQuery(calendarId);
  };

  const setQueryYear = (baseDate: Date) => {
    const { start, end } = getRangeYear(baseDate.getFullYear());
    if (dateQuery.start && dateQuery.end && isSameYmd(start, dateQuery.start) && isSameYmd(end, dateQuery.end)) {
      return;
    }
    setDateQuery({ start, end });
  };

  const setQueryMonth = (baseDate: Date) => {
    const { start, end } = getRangeMonth(baseDate.getFullYear(), baseDate.getMonth());
    if (dateQuery.start && dateQuery.end && isSameYmd(start, dateQuery.start) && isSameYmd(end, dateQuery.end)) {
      return;
    }
    setDateQuery({ start, end });
  };

  const setQueryWeek = (baseDate: Date) => {
    const { start, end } = getRangeWeek(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
    if (dateQuery.start && dateQuery.end && isSameYmd(start, dateQuery.start) && isSameYmd(end, dateQuery.end)) {
      return;
    }
    setDateQuery({ start, end });
  };

  const setQueryDateRange = (start: Date, end: Date) => {
    if (dateQuery.start && dateQuery.end && isSameYmd(start, dateQuery.start) && isSameYmd(end, dateQuery.end)) {
      return;
    }
    setDateQuery({ start, end });
  };

  return { calendar, setQueryCalendarId, setQueryYear, setQueryMonth, setQueryWeek, setQueryDateRange };
};
