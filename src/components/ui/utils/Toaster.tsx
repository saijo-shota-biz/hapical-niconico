import { Alert, Snackbar } from '@mui/material';
import { VFC } from 'react';
import { atom, useRecoilState } from 'recoil';

type ToastState = {
  open: boolean;
  status: 'success' | 'info' | 'warning' | 'error';
  message: string;
};

const toastState = atom<ToastState>({
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

export const Toaster: VFC = () => {
  const { open, status, message, closeToast } = useToast();
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={closeToast}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={status}>{message}</Alert>
    </Snackbar>
  );
};

export const useToast = () => {
  const [{ open, status, message }, setState] = useRecoilState(toastState);
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
