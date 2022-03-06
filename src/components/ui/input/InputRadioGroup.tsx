import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material';
import { FormInput } from '@ui/input/FormInput';
import { VFC } from 'react';

type Props = RadioGroupProps & {
  label: string;
  options: { value: string; label: string }[];
} & FormInput;

export const InputRadioGroup: VFC<Props> = ({ label, options, forwardRef, error, helperText, ...rest }) => {
  return (
    <FormControl error={error}>
      {label && <FormLabel id={rest.id}>{label}</FormLabel>}
      <RadioGroup {...rest} ref={forwardRef}>
        {options.map((e) => (
          <FormControlLabel key={e.value} value={e.value} control={<Radio />} label={e.label} />
        ))}
      </RadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
