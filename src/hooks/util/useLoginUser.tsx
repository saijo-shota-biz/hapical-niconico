import { doc, getDoc } from 'firebase/firestore';
import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { firestore } from '@/firebase';
import { User } from '@/types/User';

const { persistAtom } = recoilPersist();

export const LoginUserState = atom<User | null>({
  key: 'StateLoginUser',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const useLoginUser = () => {
  const [value, setValue] = useRecoilState(LoginUserState);

  const setLoginUser = async (user: User | null) => {
    if (!user) {
      setValue(null);
      return;
    }
    const docRef = doc(firestore, 'users', user.uid);
    const userDoc = await getDoc(docRef);
    setValue({ uid: userDoc.id, ...userDoc.data() } as User);
  };

  return { loginUser: value, setLoginUser };
};
