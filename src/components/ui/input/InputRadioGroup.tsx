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
import { ChangeEvent, VFC } from 'react';

type Props = Omit<RadioGroupProps, 'variant' | 'label' | 'value' | 'onChange'> & {
  label: string;
  options: { value: string; label: string }[];
} & FormInput;

export const InputRadioGroup: VFC<Props> = ({
  value,
  onChange: onChangeValue,
  label,
  options,
  forwardRef,
  ...rest
}) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChangeValue) {
      onChangeValue(event.target.value);
    }
  };
  return (
    <FormControl error={rest.error}>
      {label && <FormLabel id={rest.id}>{label}</FormLabel>}
      <RadioGroup row={rest.row} ref={forwardRef} value={value} onChange={onChange}>
        {options.map((e) => (
          <FormControlLabel key={e.value} value={e.value} control={<Radio />} label={e.label} />
        ))}
      </RadioGroup>
      <FormHelperText>{rest.helperText}</FormHelperText>
    </FormControl>
  );
};
