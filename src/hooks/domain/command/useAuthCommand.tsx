import { useHandler } from '@hooks/util/useHandler';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';

import { auth } from '@/firebase';
import { User } from '@/types/User';

export const useAuthCommand = () => {
  const { handleCommand } = useHandler();

  const signUp = handleCommand(
    (email: string, password: string): Promise<User> => {
      return createUserWithEmailAndPassword(auth, email, password).then((credential) => ({
        uid: credential.user.uid,
        name: credential.user.displayName || credential.user.email || '',
        picture: credential.user.photoURL || '',
      }));
    },
    '',
    'ログインに失敗しました。'
  );

  const signInWithEmail = handleCommand(
    (email: string, password: string): Promise<User> => {
      return signInWithEmailAndPassword(auth, email, password).then((credential) => ({
        uid: credential.user.uid,
        name: credential.user.displayName || credential.user.email || '',
        picture: credential.user.photoURL || '',
      }));
    },
    '',
    'ユーザー登録に失敗しました。'
  );

  const signOut = handleCommand(
    () => {
      return firebaseSignOut(auth);
    },
    'ログアウトしました。',
    'ログアウトに失敗しました。'
  );

  const sendPasswordResetMail = handleCommand(
    (email: string) => {
      return sendPasswordResetEmail(auth, email);
    },
    'パスワード再設定メールを送信しました。',
    'メール送信に失敗しました。'
  );

  return { signUp, signInWithEmail, signOut, sendPasswordResetMail };
};
