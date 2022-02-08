import { useLoginUser } from '@hooks/util/useLoginUser';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';

import { storage } from '@/firebase';

export const useStorage = () => {
  const { loginUser } = useLoginUser();
  const upload = async (fileUrl: string) => {
    const storageRef = ref(storage, `images/${loginUser?.uid}`);
    if (loginUser?.picture) {
      await deleteObject(storageRef);
    }
    await uploadString(storageRef, fileUrl, 'data_url');
    return await getDownloadURL(storageRef);
  };

  return { upload };
};
