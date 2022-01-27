import { useDocument } from '@hooks/db/useDocument';

import { User } from '@/types/User';

const collectionName = 'users';

export const useUserDomain = () => {
  const { getDocRef, setDoc } = useDocument(collectionName);

  const addUser = async (user: User) => {
    const { uid, ...rest } = user;
    const docRef = getDocRef(uid);
    await setDoc(docRef, rest, { merge: true });
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateUser = () => {};

  return { addUser };
};