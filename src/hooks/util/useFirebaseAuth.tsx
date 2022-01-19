import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const useFirebaseAuth = () => {
  const firebaseAuth = getAuth(getApp());

  return { firebaseAuth };
};
