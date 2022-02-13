import { Box, SxProps, TextField, TextFieldProps } from '@mui/material';
import { Label } from '@ui/typography/Label';
import { VFC } from 'react';

type Props = Omit<TextFieldProps, 'variant' | 'label'> & {
  label?: string;
  textFieldSx?: SxProps;
};

export const InputText: VFC<Props> = ({ label = null, sx, textFieldSx = {}, ...rest }) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', ...sx }}>
      {label && (
        <Label size={'sm'} sx={{ display: 'inline-block', marginBottom: 1, color: 'grey.500' }}>
          {label}
        </Label>
      )}
      <TextField {...rest} variant={'outlined'} sx={textFieldSx} />
    </Box>
  );
};
