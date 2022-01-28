import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { User } from '@/types/User';

const { persistAtom } = recoilPersist();

export const LoginUserState = atom<User | null>({
  key: 'StateLoginUser',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const useLoginUser = () => {
  const [loginUser, setLoginUser] = useRecoilState(LoginUserState);

  return { loginUser, setLoginUser };
};
