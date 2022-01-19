import { useFirestore } from '@hooks/util/useFirestore';
import { collection } from 'firebase/firestore';

export const useCollection = (collectionName: string) => {
  const { firestore } = useFirestore();
  const getCollectionRef = () => {
    return collection(firestore, collectionName);
  };
  return { getCollectionRef };
};
