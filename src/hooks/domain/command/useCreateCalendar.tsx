import { addDoc, collection } from 'firebase/firestore';

import { firestore } from '@/firebase';

const collectionName = 'calendars';

export const useCreateCalendar = () => {
  const createCalendar = async () => {
    const docRef = await addDoc(collection(firestore, collectionName), {
      comments: [],
    });
    return docRef.id;
  };

  return { createCalendar };
};
