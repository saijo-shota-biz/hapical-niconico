import { yupResolver } from '@hookform/resolvers/yup';
import get from 'lodash.get';
import { DefaultValues, useForm } from 'react-hook-form';
import { FieldPath } from 'react-hook-form/dist/types/path';
import { SchemaOf } from 'yup';

export const useValidationForm = <T extends { [key in string]: any }>(validationSchema: SchemaOf<T>) => {
  const defaultValues = validationSchema.cast({}) as DefaultValues<T>;
  const {
    formState: { errors },
    register: reactHookFormRegister,
    watch,
    setValue,
    ...rest
  } = useForm<T>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const register = <TFieldName extends FieldPath<T>>(name: TFieldName) => {
    const { ref, ...rest } = reactHookFormRegister(name);
    const error = name in errors;
    const helperText = get(errors, name)?.message;
    return { ...rest, forwardRef: ref, error, helperText };
  };

  return { ...rest, watch, setValue, register };
};
