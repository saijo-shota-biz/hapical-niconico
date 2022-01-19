import { atom, useRecoilState } from 'recoil';

import { User } from '@/types/User';

const loginUserState = atom<User | null>({
  key: 'state-current-user',
  default: null,
});

export const useLoginUser = () => {
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);

  return { loginUser, setLoginUser };
};
