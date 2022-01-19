import { useAuth } from '@hooks/util/useAuth';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { VFC } from 'react';

export const HomePage: VFC = () => {
  const { signOut } = useAuth();
  const { loginUser } = useLoginUser();
  return (
    <>
      HomePage
      {JSON.stringify(loginUser)}
      <PrimaryButton onClick={signOut}>ログアウト</PrimaryButton>
    </>
  );
};
