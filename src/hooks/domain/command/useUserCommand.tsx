import { useCalendarCommand } from '@hooks/domain/command/useCalendarCommand';
import { useHandler } from '@hooks/util/useHandler';
import { doc, setDoc } from 'firebase/firestore';

import { firestore } from '@/firebase';
import { User } from '@/types/User';

export const useUserCommand = () => {
  const { createCalendar } = useCalendarCommand();
  const { handleCommand } = useHandler();

  const createUser = handleCommand(async (user: User) => {
    const { uid, picture, ...rest } = user;
    const getRandomInt = (min: number, max: number) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    };
    const pictureUrl = picture || `/images/${getRandomInt(1, 20)}.png`;
    const docRef = doc(firestore, 'users', uid);
    await setDoc(docRef, { ...rest, picture: pictureUrl }, { merge: true });
    await createCalendar(user);
  });

  const editUser = handleCommand(
    async (user: User) => {
      const { uid, ...rest } = user;
      const docRef = doc(firestore, 'users', uid);
      await setDoc(docRef, { ...rest }, { merge: true });
    },
    'ユーザー情報を更新しました',
    'ユーザー情報の更新に失敗しました。'
  );

  return { createUser, editUser };
};
