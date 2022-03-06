import { LoginUserState } from '@hooks/util/useLoginUser';
import { chunk } from '@utils/chunk';
import { collection, documentId, getDocs, query, where } from 'firebase/firestore';
import { selector, useRecoilValue } from 'recoil';

import { firestore } from '@/firebase';
import { Calendar } from '@/types/Calendar';
import { User } from '@/types/User';

export type CalendarsQueryResult = Calendar & {
  users: User[];
  entryUsers: User[];
};

export const CalendarsQuery = selector<CalendarsQueryResult[]>({
  key: 'QueryCalendars',
  get: async ({ get }) => {
    const loginUser = get(LoginUserState);
    if (!loginUser) {
      return [];
    }
    const collectionRef = collection(firestore, 'calendars');
    const q = query(collectionRef, where('userIds', 'array-contains', loginUser.uid));
    const qs = await getDocs(q);
    const calendarQueryResultPromiseList = qs.docs
      .map((d) => ({ uid: d.id, ...d.data() } as Calendar))
      .map(async (calendar) => {
        const userCollectionRef = collection(firestore, 'users');
        const userQueryList = chunk(calendar.userIds, 10)
          .map((userIds) => query(userCollectionRef, where(documentId(), 'in', userIds)))
          .map(async (q) => {
            const qs = await getDocs(q);
            return qs.docs.map((d) => ({ uid: d.id, ...d.data() } as User));
          });
        const usersList = await Promise.all(userQueryList);

        const entryQueryList = chunk(calendar.entries, 10)
          .map((userIds) => query(userCollectionRef, where(documentId(), 'in', userIds)))
          .map(async (q) => {
            const qs = await getDocs(q);
            return qs.docs.map((d) => ({ uid: d.id, ...d.data() } as User));
          });
        const entryUsersList = await Promise.all(entryQueryList);

        const users = usersList.flatMap((e) => e);
        const entryUsers = entryUsersList.flatMap((e) => e);
        const userIds = [loginUser.uid, ...calendar.userIds.filter((userId) => userId !== loginUser.uid)];
        const entries = calendar.entries;
        return {
          ...calendar,
          users: userIds.map((userId) => users.find((e) => e.uid === userId)!),
          entryUsers: entries.map((userId) => entryUsers.find((e) => e.uid === userId)!),
        };
      });

    return await Promise.all(calendarQueryResultPromiseList);
  },
});

export const useCalendarsQuery = () => {
  const calendars = useRecoilValue(CalendarsQuery);
  return { calendars };
};
