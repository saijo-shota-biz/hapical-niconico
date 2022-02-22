import { Modal, ModalProps } from '@mui/material';
import { VFC } from 'react';

type Props = ModalProps & {};

export const BaseModal: VFC<Props> = ({ sx = {}, children, ...rest }) => {
  return (
    <Modal {...rest} sx={sx}>
      {children}
    </Modal>
  );
};
