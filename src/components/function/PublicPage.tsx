import { useLoginUser } from '@hooks/util/useLoginUser';
import { useRouter } from '@hooks/util/useRouter';
import { useEffect, VFC } from 'react';
import { Outlet } from 'react-router-dom';

export const PublicPage: VFC = () => {
  const { loginUser } = useLoginUser();
  const { pushOrRedirectUrl } = useRouter();

  useEffect(() => {
    if (loginUser) {
      pushOrRedirectUrl('/');
    }
  }, [loginUser]);

  return <Outlet />;
};
