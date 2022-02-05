import { CalendarReportsQuery } from '@hooks/domain/query/useCalendarQuery';
import { addDoc, collection } from 'firebase/firestore';
import { useRecoilRefresher_UNSTABLE } from 'recoil';

import { firestore } from '@/firebase';
import { Calendar, CalendarReport, CalendarSettings } from '@/types/Calendar';
import { User } from '@/types/User';

export const useCalendarCommand = () => {
  const refreshReports = useRecoilRefresher_UNSTABLE(CalendarReportsQuery);

  const create = async (user: User) => {
    const settingsData: Omit<CalendarSettings, 'uid'> = {};
    const settingsDocRef = await addDoc(collection(firestore, 'calendar-settings'), settingsData);

    const calendarData: Omit<Calendar, 'uid'> = {
      name: `${user.name}のカレンダー`,
      userIds: [user.uid],
      settings: settingsDocRef.path,
    };
    const calendarDocRef = await addDoc(collection(firestore, 'calendars'), calendarData);
    return calendarDocRef.id;
  };

  const addReport = async (report: Omit<CalendarReport, 'uid'>) => {
    const docRef = await addDoc(collection(firestore, 'calendar-reports'), report);
    refreshReports();
    return docRef.id;
  };

  return { create, addReport };
};
