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

  const setLoginUser = async (user: Omit<User, 'calendar'> | null) => {
    if (!user) {
      setValue(null);
      return;
    }
    const docRef = doc(firestore, 'users', user.uid).withConverter({
      toFirestore: (user: User) => {
        return {
          name: user.name,
          picture: user.picture,
          calendar: user.calendar,
        };
      },
      fromFirestore: (snapshot, options): User => {
        const data = snapshot.data(options);
        return {
          uid: snapshot.id,
          name: data.name,
          picture: data.picture,
          calendar: data.calendar,
        };
      },
    });
    const ds = await getDoc(docRef);
    const data = ds.data();
    if (data) {
      setValue(data);
    }
  };

  return { loginUser: value, setLoginUser };
};
