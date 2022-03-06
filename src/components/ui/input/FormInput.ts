import { RefCallBack } from 'react-hook-form';

export type FormInput = {
  forwardRef?: RefCallBack;
  error?: boolean;
  helperText?: string;
};
