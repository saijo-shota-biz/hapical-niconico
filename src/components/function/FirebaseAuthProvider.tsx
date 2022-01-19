import { useFirebaseAuth } from '@hooks/util/useFirebaseAuth';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, VFC } from 'react';

export const FirebaseAuthProvider: VFC = () => {
  const { firebaseAuth } = useFirebaseAuth();
  const { setLoginUser } = useLoginUser();

  useEffect(() => {
    return onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setLoginUser({
          uid: user.uid,
          name: user.displayName || user.email,
          picture: user.photoURL,
        });
      } else {
        setLoginUser(null);
      }
    });
  }, []);

  return <></>;
};
