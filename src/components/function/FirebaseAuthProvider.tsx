import { useLoginUser } from '@hooks/util/useLoginUser';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, VFC } from 'react';

import { auth } from '@/firebase';

export const FirebaseAuthProvider: VFC = () => {
  const { setLoginUser } = useLoginUser();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginUser({
          uid: user.uid,
          name: user.displayName || user.email || '',
          picture: user.photoURL || '',
        });
      } else {
        setLoginUser(null);
      }
    });
  }, []);

  return <></>;
};
