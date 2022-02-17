import { CalendarReportsQuery, CalendarState } from '@hooks/domain/query/useCalendarQuery';
import { CalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import { useHandler } from '@hooks/util/useHandler';
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

  const { handleCommand } = useHandler();

  const createCalendar = handleCommand(
    async (user: User, name?: string) => {
      const calendarData: Omit<Calendar, 'uid'> = {
        name: name || `${user.name}のカレンダー`,
        userIds: [user.uid],
        entries: [],
      };
      const calendarDocRef = await addDoc(collection(firestore, 'calendars'), calendarData);
      refreshCalendars();
      return calendarDocRef.id;
    },
    `カレンダーを作成しました。`,
    'カレンダーの作成に失敗しました。'
  );

  const editCalendar = handleCommand(
    async (calendarId: string, name: string) => {
      const calendarDocRef = doc(firestore, 'calendars', calendarId);
      await setDoc(calendarDocRef, { name }, { merge: true });
      refreshCalendars();
    },
    'カレンダー名を変更しました。',
    'カレンダー名の変更に失敗しました。'
  );

  const deleteCalendar = handleCommand(
    async (calendar: CalendarState) => {
      const calendarDocRef = doc(firestore, 'calendars', calendar.uid);
      await deleteDoc(calendarDocRef);
      const reportCollectionRef = collection(firestore, 'calendar-reports');
      const q = query(reportCollectionRef, where('calendarId', '==', calendar.uid));
      getDocs(q).then((reportDocs) => {
        const reportDocRefs = reportDocs.docs.map((e) => doc(firestore, 'calendar-reports', e.id));
        reportDocRefs.forEach((e) => deleteDoc(e));
      });
      refreshCalendars();
    },
    'カレンダーを削除しました。',
    'カレンダーの削除に失敗しました。'
  );

  const addReport = handleCommand(
    async (report: Omit<CalendarReport, 'uid'>, uid: string = '') => {
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
    },
    'レポートを追加しました。',
    'レポートの追加に失敗しました。'
  );

  const entry = handleCommand(async (calendarId: string, userId: string) => {
    const docRef = await doc(firestore, 'calendars', calendarId);
    await updateDoc(docRef, { entries: arrayUnion(userId) });
  });

  const entryAccept = handleCommand(
    async (calendarId: string, userId: string) => {
      const docRef = await doc(firestore, 'calendars', calendarId);
      await updateDoc(docRef, { userIds: arrayUnion(userId), entries: arrayRemove(userId) });
      refreshCalendars();
    },
    '参加リクエストを承認しました。',
    '参加リクエストの承認に失敗しました。'
  );

  const entryReject = handleCommand(
    async (calendarId: string, userId: string) => {
      const docRef = await doc(firestore, 'calendars', calendarId);
      await updateDoc(docRef, { entries: arrayRemove(userId) });
      refreshCalendars();
    },
    '参加リクエストを拒否しました。',
    '参加リクエストの拒否に失敗しました。'
  );

  const deleteUser = handleCommand(
    async (calendarId: string, user: User) => {
      const docRef = await doc(firestore, 'calendars', calendarId);
      await updateDoc(docRef, { userIds: arrayRemove(user.uid) });
      const reportCollectionRef = collection(firestore, 'calendar-reports');
      const q = query(reportCollectionRef, where('calendarId', '==', calendarId), where('userId', '==', user.uid));
      getDocs(q).then((reportDocs) => {
        const reportDocRefs = reportDocs.docs.map((e) => doc(firestore, 'calendar-reports', e.id));
        reportDocRefs.forEach((e) => deleteDoc(e));
      });
      refreshCalendars();
    },
    'ユーザーをカレンダーから削除しました。',
    'ユーザーをカレンダーからの削除に失敗しました。'
  );

  return { createCalendar, editCalendar, deleteCalendar, addReport, entry, entryAccept, entryReject, deleteUser };
};
