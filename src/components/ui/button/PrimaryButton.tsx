import { Box } from '@mui/material';
import { AppButton, AppButtonProps } from '@ui/button/AppButton';
import { Loading } from '@ui/utils/Loading';
import { VFC } from 'react';

type Props = Omit<AppButtonProps, 'color' | 'variant'> & {
  loading?: boolean;
};

export const PrimaryButton: VFC<Props> = ({ children, loading = false, disabled = false, ...rest }) => {
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <AppButton disabled={loading || disabled} {...rest}>
          {children}
        </AppButton>
        {loading && (
          <Loading
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </>
  );
};
