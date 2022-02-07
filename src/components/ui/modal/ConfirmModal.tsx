import { useConfirmModal } from '@hooks/components/useConfirmModal';
import { Modal } from '@mui/material';
import { AppButton } from '@ui/button/AppButton';
import { RefCard } from '@ui/card/Card';
import { CardActions } from '@ui/card/CardActions';
import { CardContent } from '@ui/card/CardContent';
import { CardHeader } from '@ui/card/CardHeader';
import { VFC } from 'react';

export const ConfirmModal: VFC = () => {
  const { open, close, header, content, action, onClickOk, onClickCancel } = useConfirmModal();
  return (
    <Modal
      open={open}
      onClose={close}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <RefCard sx={{ width: '60%' }}>
        {header && <CardHeader onClose={close}>{header}</CardHeader>}
        {content && <CardContent>{content}</CardContent>}
        {action && (
          <CardActions>
            {action.cancel && (
              <AppButton color={action.cancel.color} onClick={onClickCancel}>
                {action.cancel.label}
              </AppButton>
            )}
            {action.ok && (
              <AppButton color={action.ok.color} onClick={onClickOk}>
                {action.ok.label}
              </AppButton>
            )}
          </CardActions>
        )}
      </RefCard>
    </Modal>
  );
};
