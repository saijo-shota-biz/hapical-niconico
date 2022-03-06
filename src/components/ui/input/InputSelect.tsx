import { Box, MenuItem, Select, SelectChangeEvent, SelectProps, SxProps } from '@mui/material';
import { FormInput } from '@ui/input/FormInput';
import { Label } from '@ui/typography/Label';
import { VFC } from 'react';

type Props = Omit<SelectProps<string>, 'variant' | 'label' | 'value' | 'onChange'> & {
  label?: string;
  options: { label: string; value: string }[];
  inputSx?: SxProps;
} & FormInput;

export const InputSelect: VFC<Props> = ({
  value,
  onChange: onChangeValue,
  label = null,
  sx,
  inputSx,
  forwardRef,
  options,
  ...rest
}) => {
  const onChange = (event: SelectChangeEvent) => {
    if (onChangeValue) {
      onChangeValue(event.target.value);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', ...sx }}>
      {label && (
        <Label size={'sm'} sx={{ display: 'inline-block', marginBottom: 1, color: 'grey.500' }}>
          {label}
        </Label>
      )}
      <Select {...rest} value={value} onChange={onChange} variant={'outlined'} ref={forwardRef} sx={inputSx}>
        {options.map((e) => (
          <MenuItem key={e.value} value={e.value}>
            {e.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
