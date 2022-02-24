import { LoginUserState } from '@hooks/util/useLoginUser';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { selector, useRecoilValue } from 'recoil';

import { firestore } from '@/firebase';
import { CalendarReport } from '@/types/Calendar';

export const MyReportsQuery = selector<CalendarReport[]>({
  key: 'QueryMyReports',
  get: async ({ get }) => {
    const loginUser = get(LoginUserState);
    if (!loginUser) {
      return [];
    }

    const calendarReportsCollectionRef = collection(firestore, 'calendar-reports');
    const wheres = [];
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

  return { reports };
};
