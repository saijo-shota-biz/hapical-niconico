import { Box, MenuItem, Select, SelectProps } from '@mui/material';
import { Label } from '@ui/typography/Label';
import { VFC } from 'react';
import { RefCallBack } from 'react-hook-form';

type Props = Omit<SelectProps<string>, 'variant' | 'label'> & {
  label?: string;
  options: { label: string; value: string }[];
  forwardRef?: RefCallBack;
};

export const InputSelect: VFC<Props> = ({ label = null, sx, options, forwardRef, ...rest }) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', ...sx }}>
      {label && (
        <Label size={'sm'} sx={{ display: 'inline-block', marginBottom: 1, color: 'grey.500' }}>
          {label}
        </Label>
      )}
      <Select {...rest} variant={'outlined'} ref={forwardRef}>
        {options.map((e) => (
          <MenuItem key={e.value} value={e.value}>
            {e.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
