import { ButtonProps } from '@mui/material';
import { ReactNode } from 'react';
import { atom, useRecoilState } from 'recoil';

type ConfirmModalStateType = {
  open: boolean;
  onClickOk: () => void;
  onClickCancel: () => void;
} & ConfirmModalView;

const ConfirmModalState = atom<ConfirmModalStateType>({
  key: 'StateConfirmModal',
  default: {
    open: false,
    onClickOk: () => {},
    onClickCancel: () => {},
  },
});

type ConfirmModalViewAction = Pick<ButtonProps, 'color'> & { label: string };

type ConfirmModalView = {
  header?: ReactNode;
  content?: ReactNode;
  action?: {
    cancel?: ConfirmModalViewAction;
    ok?: ConfirmModalViewAction;
  };
};

export const useConfirmModal = () => {
  const [confirmModal, setConfirmModal] = useRecoilState(ConfirmModalState);

  const confirm = (
    { header, content, action }: ConfirmModalView = {
      header: '確認',
      content: '本当に実行しますか？',
      action: {
        cancel: {
          color: 'neutral',
          label: 'キャンセル',
        },
        ok: {
          color: 'primary',
          label: 'OK',
        },
      },
    }
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmModal((prev) => ({
        ...prev,
        open: true,
        onClickOk: () => {
          close();
          resolve(true);
        },
        onClickCancel: () => {
          close();
          resolve(false);
        },
        header,
        content,
        action,
      }));
    });
  };

  const close = () => {
    setConfirmModal({
      open: false,
      onClickOk: () => {},
      onClickCancel: () => {},
    });
  };

  return { confirm, close: confirmModal.onClickCancel, ...confirmModal };
};
