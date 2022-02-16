import { useLoginUser } from '@hooks/util/useLoginUser';
import { useRouter } from '@hooks/util/useRouter';
import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const SecurityPage: FC = () => {
  const { loginUser } = useLoginUser();
  const { push, setRedirectUrl } = useRouter();

  useEffect(() => {
    if (!loginUser) {
      setRedirectUrl(window.location.pathname);
      push(`/signin`);
    }
  }, [loginUser]);

  return <Outlet />;
};
