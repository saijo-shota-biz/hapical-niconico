import { useFirestore } from '@hooks/util/useFirestore';
import { doc, setDoc, getDocs, getDoc } from 'firebase/firestore';

export const useDocument = (collectionName: string) => {
  const { firestore } = useFirestore();
  const getDocRef = (documentId: string) => {
    return doc(firestore, collectionName, documentId);
  };

  return { getDocRef, setDoc, getDocs, getDoc };
};
