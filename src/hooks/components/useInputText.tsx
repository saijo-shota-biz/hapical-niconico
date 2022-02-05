import { ChangeEvent, useState } from 'react';

export const useInputText = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return { value, onChange };
};
