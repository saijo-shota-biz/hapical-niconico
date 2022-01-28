import { useTeamList } from '@hooks/domain/useTeamList';
import { VFC } from 'react';

export const TeamListPage: VFC = () => {
  const teamList = useTeamList();
  return <>{JSON.stringify(teamList)}</>;
};
