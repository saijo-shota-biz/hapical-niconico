import { useCreateCalendar } from '@hooks/domain/command/useCreateCalendar';
import { doc, setDoc } from 'firebase/firestore';

import { firestore } from '@/firebase';
import { User } from '@/types/User';

const collectionName = 'users';

export const useCreateUser = () => {
  const { createCalendar } = useCreateCalendar();
  const createUser = async (user: Omit<User, 'calendar'>) => {
    const calenderDocId = await createCalendar();
    const { uid, ...rest } = user;
    const docRef = doc(firestore, collectionName, uid);
    await setDoc(
      docRef,
      {
        ...rest,
        calender: doc(firestore, 'calenders', calenderDocId),
      },
      { merge: true }
    );
  };

  return { createUser };
};
