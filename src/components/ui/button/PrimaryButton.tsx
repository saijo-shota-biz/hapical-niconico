import { Box, Button, ButtonProps } from '@mui/material';
import { Loading } from '@ui/utils/Loading';
import { VFC } from 'react';

type Props = Omit<ButtonProps, 'color' | 'variant' | 'disableElevation'> & {
  loading?: boolean;
};

export const PrimaryButton: VFC<Props> = ({ children, loading = false, disabled = false, ...rest }) => {
  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <Button {...rest} color={'primary'} variant={'contained'} disableElevation disabled={loading || disabled}>
          {children}
        </Button>
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
