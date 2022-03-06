import { Box, SxProps, TextField, TextFieldProps } from '@mui/material';
import { FormInput } from '@ui/input/FormInput';
import { Label } from '@ui/typography/Label';
import { ChangeEvent, VFC } from 'react';
import { RefCallBack } from 'react-hook-form';

export type InputTextProps = Omit<TextFieldProps, 'variant' | 'label' | 'value' | 'onChange'> & {
  label?: string;
  inputSx?: SxProps;
  forwardRef?: RefCallBack;
} & FormInput;

export const InputText: VFC<InputTextProps> = ({
  value,
  onChange: onChangeValue,
  label = null,
  sx,
  inputSx = {},
  forwardRef,
  ...rest
}) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChangeValue) {
      onChangeValue(event.target.value);
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', ...sx }}>
      {label && (
        <Label size={'sm'} sx={{ display: 'inline-block', marginBottom: 1, color: 'grey.500' }}>
          {label}
        </Label>
      )}
      <TextField {...rest} value={value} onChange={onChange} variant={'outlined'} sx={inputSx} inputRef={forwardRef} />
    </Box>
  );
};
