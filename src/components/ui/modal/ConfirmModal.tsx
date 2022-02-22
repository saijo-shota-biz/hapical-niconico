import { useConfirmModal } from '@hooks/components/useConfirmModal';
import { AppButton } from '@ui/button/AppButton';
import { ModalCard } from '@ui/card/Card';
import { CardActions } from '@ui/card/CardActions';
import { CardContent } from '@ui/card/CardContent';
import { CardHeader } from '@ui/card/CardHeader';
import { BaseModal } from '@ui/modal/BaseModal';
import { VFC } from 'react';

export const ConfirmModal: VFC = () => {
  const { open, close, header, content, action, onClickOk, onClickCancel } = useConfirmModal();
  return (
    <BaseModal
      open={open}
      onClose={close}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ModalCard>
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
      </ModalCard>
    </BaseModal>
  );
};
