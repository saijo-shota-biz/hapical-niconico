import { useDate } from '@hooks/util/useDate';
import { LoginUserState } from '@hooks/util/useLoginUser';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

import { firestore } from '@/firebase';
import { CalendarReport } from '@/types/Calendar';

type CalendarQueryStateType = {
  start: Date | null;
  end: Date | null;
};

const MyReportsQueryState = atom<CalendarQueryStateType>({
  key: 'StateMyReportsQuery',
  default: {
    start: null,
    end: null,
  },
});

export const MyReportsQuery = selector<CalendarReport[]>({
  key: 'QueryMyReports',
  get: async ({ get }) => {
    const loginUser = get(LoginUserState);
    if (!loginUser) {
      return [];
    }

    const { start, end } = get(MyReportsQueryState);
    if (!start || !end) {
      return [];
    }

    const calendarReportsCollectionRef = collection(firestore, 'calendar-reports');
    const wheres = [];
    wheres.push(where('date', '>=', start));
    wheres.push(where('date', '<=', end));
    wheres.push(where('userId', '==', loginUser.uid));
    const q = query(calendarReportsCollectionRef, ...wheres);
    const calendarReportsDocs = await getDocs(q);
    const reports: CalendarReport[] = [];
    calendarReportsDocs.forEach((report) =>
      reports.push({ uid: report.id, ...report.data(), date: report.get('date').toDate() } as CalendarReport)
    );
    return reports;
  },
});

export const useMyReportsQuery = () => {
  const reports = useRecoilValue(MyReportsQuery);
  const [state, setState] = useRecoilState(MyReportsQueryState);

  const { getRangeYear, getRangeMonth, getRangeWeek } = useDate();

  const setQueryYear = (baseDate: Date) => {
    setState((prev) => ({ ...prev, ...getRangeYear(baseDate.getFullYear()) }));
  };

  const setQueryMonth = (baseDate: Date) => {
    setState((prev) => ({ ...prev, ...getRangeMonth(baseDate.getFullYear(), baseDate.getMonth()) }));
  };

  const setQueryWeek = (baseDate: Date) => {
    setState((prev) => ({ ...prev, ...getRangeWeek(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate()) }));
  };

  const setQueryDateRange = (start: Date, end: Date) => {
    setState((prev) => ({ ...prev, start, end }));
  };

  return { ...state, reports, setQueryYear, setQueryMonth, setQueryWeek, setQueryDateRange };
};
