import { useTeamList } from '@hooks/domain/query/useTeamList';
import { VFC } from 'react';

export const TeamListPage: VFC = () => {
  const teamList = useTeamList();
  return <>{JSON.stringify(teamList)}</>;
};
