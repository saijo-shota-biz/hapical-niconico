import { CalendarQueryDateState } from '@hooks/domain/query/useCalendarReportsQueryDate';
import { CalendarQueryCalendarIdState } from '@hooks/domain/query/useCurrentCalendarId';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { selector, useRecoilValue } from 'recoil';

import { firestore } from '@/firebase';
import { CalendarReport } from '@/types/Calendar';

export const CalendarReportsQuery = selector<CalendarReport[]>({
  key: 'QueryCalendarReports',
  get: async ({ get }) => {
    const calendarId = get(CalendarQueryCalendarIdState);
    const { start, end } = get(CalendarQueryDateState);
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

export const useCalendarReportsQuery = () => {
  const reports = useRecoilValue(CalendarReportsQuery);
  return { reports };
};
