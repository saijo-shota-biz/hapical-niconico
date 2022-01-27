import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { User } from '@/types/User';

const { persistAtom } = recoilPersist();

const loginUserState = atom<User | null>({
  key: 'state-current-user',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const useLoginUser = () => {
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);

  return { loginUser, setLoginUser };
};
