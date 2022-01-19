import { Close } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { Label } from '@ui/typography/Label';
import { Spacer } from '@ui/utils/Spacer';
import { ReactNode, VFC } from 'react';

type Props = {
  children?: ReactNode;
  onClose?: () => void;
};

export const CardHeader: VFC<Props> = ({ children = null, onClose = null }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        padding: 3,
        borderBottom: 'solid 1px',
        borderBottomColor: 'grey.100',
        backgroundColor: 'grey.50',
        alignItems: 'center',
      }}
    >
      {children && <Label size={'lg'}>{children}</Label>}
      {onClose && (
        <>
          <Spacer />
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </>
      )}
    </Box>
  );
};
