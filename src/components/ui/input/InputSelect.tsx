import { Box, MenuItem, Select, SelectProps, SxProps } from '@mui/material';
import { FormInput } from '@ui/input/FormInput';
import { Label } from '@ui/typography/Label';
import { VFC } from 'react';

type Props = Omit<SelectProps<string>, 'variant' | 'label'> & {
  label?: string;
  options: { label: string; value: string }[];
  inputSx?: SxProps;
} & FormInput;

export const InputSelect: VFC<Props> = ({ label = null, sx, options, forwardRef, inputSx, ...rest }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', ...sx }}>
      {label && (
        <Label size={'sm'} sx={{ display: 'inline-block', marginBottom: 1, color: 'grey.500' }}>
          {label}
        </Label>
      )}
      <Select {...rest} variant={'outlined'} ref={forwardRef} sx={inputSx}>
        {options.map((e) => (
          <MenuItem key={e.value} value={e.value}>
            {e.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
