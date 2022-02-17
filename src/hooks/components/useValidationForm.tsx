import { yupResolver } from '@hookform/resolvers/yup';
import get from 'lodash.get';
import { useForm } from 'react-hook-form';
import { FieldPath } from 'react-hook-form/dist/types/path';
import { AnyObjectSchema } from 'yup';

export const useValidationForm = <T,>(validationSchema: AnyObjectSchema) => {
  const {
    formState: { errors },
    register: reactHookFormRegister,
    ...rest
  } = useForm<T>({
    resolver: yupResolver(validationSchema),
  });

  const register = <TFieldName extends FieldPath<T>>(name: TFieldName) => {
    const { ref, ...rest } = reactHookFormRegister(name);
    const error = name in errors;
    const helperText = get(errors, name)?.message;
    return { forwardRef: ref, error, helperText, ...rest };
  };

  return { ...rest, register };
};
