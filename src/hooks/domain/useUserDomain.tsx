import { doc, setDoc } from 'firebase/firestore';

import { firestore } from '@/firebase';
import { User } from '@/types/User';

const collectionName = 'users';

export const useUserDomain = () => {
  const addUser = async (user: User) => {
    const { uid, ...rest } = user;
    const docRef = doc(firestore, collectionName, uid);
    await setDoc(docRef, rest, { merge: true });
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateUser = () => {};

  return { addUser };
};
