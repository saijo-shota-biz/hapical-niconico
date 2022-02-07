import { CalendarQueryResult, CalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import { LoginUserState } from '@hooks/util/useLoginUser';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';

import { firestore } from '@/firebase';
import { CalendarReport, CalendarSettings } from '@/types/Calendar';

export const CalendarReportsQuery = selector<CalendarReport[]>({
  key: 'QueryCalendarReports',
  get: async ({ get }) => {
    const { calendarId, year, month, date } = get(CalendarQueryState);
    if (!calendarId || !year || !month) {
      return [];
    }

    const calendarReportsCollectionRef = collection(firestore, 'calendar-reports');
    const wheres = [];
    year && wheres.push(where('year', '==', year));
    month && wheres.push(where('month', '==', month));
    date && wheres.push(where('date', '==', date));
    const q = query(calendarReportsCollectionRef, where('calendarId', '==', calendarId), ...wheres);
    const calendarReportsDocs = await getDocs(q);
    const reports: CalendarReport[] = [];
    calendarReportsDocs.forEach((report) => reports.push({ uid: report.id, ...report.data() } as CalendarReport));
    return reports;
  },
});

export type CalendarState = Omit<CalendarQueryResult, 'settings'> & {
  settings: CalendarSettings;
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

    const calendarSettingsDocRef = doc(firestore, calendar.settings);
    const calendarSettingsDoc = await getDoc(calendarSettingsDocRef);

    const reports = get(CalendarReportsQuery);

    return {
      ...calendar,
      reports,
      settings: {
        uid: calendarSettingsDoc.id,
        ...calendarSettingsDoc.data(),
      },
    };
  },
});

type CalendarQueryStateType = {
  calendarId: string;
  year: number | null;
  month: number | null;
  date: number | null;
};

const CalendarQueryState = atom<CalendarQueryStateType>({
  key: 'StateCalendarQueryState',
  default: {
    calendarId: '',
    year: null,
    month: null,
    date: null,
  },
});

export const useCalendarQuery = () => {
  const calendar = useRecoilValue(CalendarQuery);
  const setQuery = useSetRecoilState(CalendarQueryState);

  const setQueryCalendarId = (calendarId: string) => {
    const today = new Date();
    setQuery({
      calendarId,
      year: today.getFullYear(),
      month: today.getMonth(),
      date: null,
    });
  };

  const setQueryMonth = (year: number, month: number) => {
    setQuery((prev) => ({ ...prev, year, month }));
  };

  return { calendar, setQueryCalendarId, setQueryMonth };
};
