import { useToaster } from '@hooks/components/useToaster';
import { Alert, Snackbar } from '@mui/material';
import { VFC } from 'react';

export const Toaster: VFC = () => {
  const { open, status, message, closeToast } = useToaster();
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
