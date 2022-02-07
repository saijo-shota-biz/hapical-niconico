import { CalendarReportsQuery } from '@hooks/domain/query/useCalendarQuery';
import { CalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useRecoilRefresher_UNSTABLE } from 'recoil';

import { firestore } from '@/firebase';
import { Calendar, CalendarReport, CalendarSettings } from '@/types/Calendar';
import { User } from '@/types/User';

export const useCalendarCommand = () => {
  const refreshReports = useRecoilRefresher_UNSTABLE(CalendarReportsQuery);
  const refreshCalendars = useRecoilRefresher_UNSTABLE(CalendarsQuery);

  const create = async (user: User, name?: string) => {
    const settingsData: Omit<CalendarSettings, 'uid'> = {};
    const settingsDocRef = await addDoc(collection(firestore, 'calendar-settings'), settingsData);

    const calendarData: Omit<Calendar, 'uid'> = {
      name: name || `${user.name}のカレンダー`,
      userIds: [user.uid],
      settings: settingsDocRef.path,
    };
    const calendarDocRef = await addDoc(collection(firestore, 'calendars'), calendarData);
    refreshCalendars();
    return calendarDocRef.id;
  };

  const addReport = async (report: Omit<CalendarReport, 'uid'>, uid: string = '') => {
    if (uid) {
      const docRef = await doc(firestore, 'calendar-reports', uid);
      await setDoc(docRef, report, { merge: true });
      refreshReports();
      return uid;
    } else {
      const docRef = await addDoc(collection(firestore, 'calendar-reports'), report);
      refreshReports();
      return docRef.id;
    }
  };

  return { create, addReport };
};
