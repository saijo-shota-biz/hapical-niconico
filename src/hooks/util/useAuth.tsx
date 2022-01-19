import { useFirebaseAuth } from '@hooks/util/useFirebaseAuth';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { useCallback } from 'react';

import { User } from '@/types/User';

export const useAuth = () => {
  const { firebaseAuth } = useFirebaseAuth();

  const signUp = useCallback((email: string, password: string): Promise<User> => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((credential) => ({
        uid: credential.user.uid,
        name: credential.user.displayName || credential.user.email,
        picture: credential.user.photoURL,
      }))
      .catch((error) => {
        console.log(error.message);
        return error;
      });
  }, []);

  const signInWithEmail = useCallback((email: string, password: string): Promise<User> => {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((credential) => ({
        uid: credential.user.uid,
        name: credential.user.displayName || credential.user.email,
        picture: credential.user.photoURL,
      }))
      .catch((error) => {
        console.log(error.message);
        return error;
      });
  }, []);

  const signOut = useCallback(() => {
    return firebaseSignOut(firebaseAuth).catch((error) => {
      console.log(error.message);
      return error;
    });
  }, []);

  const sendPasswordResetMail = useCallback((email: string) => {
    return sendPasswordResetEmail(firebaseAuth, email);
  }, []);

  return { signUp, signInWithEmail, signOut, sendPasswordResetMail };
};
