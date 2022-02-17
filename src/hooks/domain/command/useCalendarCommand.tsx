import { useToaster } from '@hooks/components/useToaster';
import { CalendarReportsQuery, CalendarState } from '@hooks/domain/query/useCalendarQuery';
import { CalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useRecoilRefresher_UNSTABLE } from 'recoil';

import { firestore } from '@/firebase';
import { Calendar, CalendarReport } from '@/types/Calendar';
import { User } from '@/types/User';

export const useCalendarCommand = () => {
  const refreshReports = useRecoilRefresher_UNSTABLE(CalendarReportsQuery);
  const refreshCalendars = useRecoilRefresher_UNSTABLE(CalendarsQuery);

  const { showToast } = useToaster();

  const createCalendar = async (user: User, name?: string) => {
    const calendarData: Omit<Calendar, 'uid'> = {
      name: name || `${user.name}のカレンダー`,
      userIds: [user.uid],
      entries: [],
    };
    const calendarDocRef = await addDoc(collection(firestore, 'calendars'), calendarData);
    refreshCalendars();
    showToast({
      status: 'success',
      message: `${calendarData.name}を作成しました。`,
    });
    return calendarDocRef.id;
  };

  const editCalendar = async (calendarId: string, name: string) => {
    const calendarDocRef = doc(firestore, 'calendars', calendarId);
    await setDoc(calendarDocRef, { name }, { merge: true });
    refreshCalendars();
    showToast({
      status: 'success',
      message: `カレンダー名を${name}に変更しました。`,
    });
  };

  const deleteCalendar = async (calendar: CalendarState) => {
    const calendarDocRef = doc(firestore, 'calendars', calendar.uid);
    await deleteDoc(calendarDocRef);
    const reportCollectionRef = collection(firestore, 'calendar-reports');
    const q = query(reportCollectionRef, where('calendarId', '==', calendar.uid));
    getDocs(q).then((reportDocs) => {
      const reportDocRefs = reportDocs.docs.map((e) => doc(firestore, 'calendar-reports', e.id));
      reportDocRefs.forEach((e) => deleteDoc(e));
    });
    refreshCalendars();
    showToast({
      status: 'success',
      message: `${calendar.name}を削除しました。`,
    });
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

  const entry = async (calendarId: string, userId: string) => {
    const docRef = await doc(firestore, 'calendars', calendarId);
    await updateDoc(docRef, { entries: arrayUnion(userId) });
  };

  const entryAccept = async (calendarId: string, userId: string) => {
    const docRef = await doc(firestore, 'calendars', calendarId);
    await updateDoc(docRef, { userIds: arrayUnion(userId), entries: arrayRemove(userId) });
    refreshCalendars();
    showToast({
      status: 'success',
      message: `参加リクエストを承認しました。`,
    });
  };

  const entryReject = async (calendarId: string, userId: string) => {
    const docRef = await doc(firestore, 'calendars', calendarId);
    await updateDoc(docRef, { entries: arrayRemove(userId) });
    refreshCalendars();
    showToast({
      status: 'success',
      message: `参加リクエストを拒否しました。`,
    });
  };

  const deleteUser = async (calendarId: string, user: User) => {
    const docRef = await doc(firestore, 'calendars', calendarId);
    await updateDoc(docRef, { userIds: arrayRemove(user.uid) });
    refreshCalendars();
    showToast({
      status: 'success',
      message: `${user.name}をカレンダーから削除しました。`,
    });
  };

  return { createCalendar, editCalendar, deleteCalendar, addReport, entry, entryAccept, entryReject, deleteUser };
};
