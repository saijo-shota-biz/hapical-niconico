import { useLoginUser } from '@hooks/util/useLoginUser';
import { useRouter } from '@hooks/util/useRouter';
import { useEffect, VFC } from 'react';
import { Outlet } from 'react-router-dom';

export const PublicPage: VFC = () => {
  const { loginUser } = useLoginUser();
  const { push } = useRouter();

  useEffect(() => {
    if (loginUser) {
      push('/');
    }
  }, [loginUser]);

  return <Outlet />;
};
