import { Box, SxProps, TextField, TextFieldProps } from '@mui/material';
import { Label } from '@ui/typography/Label';
import { VFC } from 'react';
import { RefCallBack } from 'react-hook-form';

export type InputTextProps = Omit<TextFieldProps, 'variant' | 'label'> & {
  label?: string;
  textFieldSx?: SxProps;
  forwardRef?: RefCallBack;
};

export const InputText: VFC<InputTextProps> = ({ label = null, sx, textFieldSx = {}, forwardRef, ...rest }) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', ...sx }}>
      {label && (
        <Label size={'sm'} sx={{ display: 'inline-block', marginBottom: 1, color: 'grey.500' }}>
          {label}
        </Label>
      )}
      <TextField {...rest} variant={'outlined'} sx={textFieldSx} ref={forwardRef} />
    </Box>
  );
};
