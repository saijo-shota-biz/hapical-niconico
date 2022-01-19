import { getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const useFirestore = () => {
  const firestore = getFirestore(getApp());

  return { firestore };
};
