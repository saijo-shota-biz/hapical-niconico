import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { useCallback } from 'react';

import { auth } from '@/firebase';
import { User } from '@/types/User';

export const useAuth = () => {
  const signUp = useCallback((email: string, password: string): Promise<Omit<User, 'calendar'>> => {
    return createUserWithEmailAndPassword(auth, email, password).then((credential) => ({
      uid: credential.user.uid,
      name: credential.user.displayName || credential.user.email || '',
      picture: credential.user.photoURL || '',
    }));
  }, []);

  const signInWithEmail = useCallback((email: string, password: string): Promise<Omit<User, 'calendar'>> => {
    return signInWithEmailAndPassword(auth, email, password).then((credential) => ({
      uid: credential.user.uid,
      name: credential.user.displayName || credential.user.email || '',
      picture: credential.user.photoURL || '',
    }));
  }, []);

  const signOut = useCallback(() => {
    return firebaseSignOut(auth);
  }, []);

  const sendPasswordResetMail = useCallback((email: string) => {
    return sendPasswordResetEmail(auth, email);
  }, []);

  return { signUp, signInWithEmail, signOut, sendPasswordResetMail };
};
