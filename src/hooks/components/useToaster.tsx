import { atom, useRecoilState } from 'recoil';

type ToastStateType = {
  open: boolean;
  status: 'success' | 'info' | 'warning' | 'error';
  message: string;
};

const ToastState = atom<ToastStateType>({
  key: 'StateToast',
  default: {
    open: false,
    status: 'success',
    message: '',
  },
});

type ShowToastProps = {
  status: 'success' | 'info' | 'warning' | 'error';
  message: string;
};

export const useToaster = () => {
  const [{ open, status, message }, setState] = useRecoilState(ToastState);
  const showToast = ({ status, message }: ShowToastProps) => {
    setState({
      open: true,
      status,
      message,
    });
  };
  const closeToast = () => {
    setState({
      open: false,
      status: 'success',
      message: '',
    });
  };

  return { open, message, status, showToast, closeToast };
};
