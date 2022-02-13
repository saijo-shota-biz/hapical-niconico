import { LoginUserState } from '@hooks/util/useLoginUser';
import { collection, getDocs, query, where, documentId } from 'firebase/firestore';
import { selector, useRecoilValue } from 'recoil';

import { firestore } from '@/firebase';
import { Calendar } from '@/types/Calendar';
import { User } from '@/types/User';

const chunk = <T,>(array: T[], size: number) => {
  const chunked = [];
  let index = 0;

  while (index < array.length) {
    chunked.push(array.slice(index, index + size));
    index += size;
  }

  return chunked;
};

export type CalendarQueryResult = Calendar & {
  users: User[];
};

export const CalendarsQuery = selector<CalendarQueryResult[]>({
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
        const users = await Promise.all(userQueryList);
        return {
          ...calendar,
          users: users.flatMap((e) => e),
        };
      });

    return await Promise.all(calendarQueryResultPromiseList);
  },
});

export const useCalendarsQuery = () => {
  const calendars = useRecoilValue(CalendarsQuery);
  return { calendars };
};