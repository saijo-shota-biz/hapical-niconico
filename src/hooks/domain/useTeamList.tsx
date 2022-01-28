import { LoginUserState } from '@hooks/util/useLoginUser';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { selector, useRecoilValue } from 'recoil';

import { firestore } from '@/firebase';

const collectionName = 'teams';

const TeamListQuery = selector<any[]>({
  key: 'QueryTeamList',
  get: async ({ get }) => {
    const loginUser = get(LoginUserState);
    if (!loginUser) {
      return [];
    }
    const collectionRef = collection(firestore, collectionName);
    const q = query(collectionRef, where('users', 'array-contains', loginUser.uid));
    const qs = await getDocs(q);
    const docs: any[] = [];
    qs.forEach((doc) => {
      docs.push({
        uid: doc.id,
        ...doc.data(),
      });
    });
    return docs;
  },
});

export const useTeamList = () => {
  return useRecoilValue(TeamListQuery);
};
