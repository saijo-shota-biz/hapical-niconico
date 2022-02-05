import { LoginUserState } from '@hooks/util/useLoginUser';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { selector, useRecoilValue } from 'recoil';

import { firestore } from '@/firebase';
import { Calendar } from '@/types/Calendar';

export const CalendarsQuery = selector<Calendar[]>({
  key: 'QueryCalendars',
  get: async ({ get }) => {
    const loginUser = get(LoginUserState);
    if (!loginUser) {
      return [];
    }
    const collectionRef = collection(firestore, 'calendars');
    const q = query(collectionRef, where('userIds', 'array-contains', loginUser.uid));
    const qs = await getDocs(q);
    const docs: any[] = [];
    qs.forEach((doc) => {
      docs.push({ uid: doc.id, ...doc.data() });
    });
    return docs;
  },
});

export const useCalendarsQuery = () => {
  const calendars = useRecoilValue(CalendarsQuery);
  return { calendars };
};
