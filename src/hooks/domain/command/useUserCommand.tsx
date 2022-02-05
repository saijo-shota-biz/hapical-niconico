import { useCalendarCommand } from '@hooks/domain/command/useCalendarCommand';
import { doc, setDoc } from 'firebase/firestore';

import { firestore } from '@/firebase';
import { User } from '@/types/User';

export const useUserCommand = () => {
  const { create: createCalendar } = useCalendarCommand();

  const create = async (user: User) => {
    const { uid, ...rest } = user;
    const docRef = doc(firestore, 'users', uid);
    await setDoc(docRef, { ...rest }, { merge: true });
    await createCalendar(user);
  };

  return { create };
};
