import { useCalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { useRouter } from '@hooks/util/useRouter';
import { useEffect, VFC } from 'react';
import { Outlet } from 'react-router-dom';

export const PublicPage: VFC = () => {
  const { loginUser } = useLoginUser();
  const { pushOrRedirectUrl } = useRouter();

  const { calendars } = useCalendarsQuery();

  useEffect(() => {
    if (loginUser && calendars.length > 0) {
      pushOrRedirectUrl(`/calendars/${calendars[0].uid}`);
    }
  }, [loginUser, calendars]);

  return <Outlet />;
};
