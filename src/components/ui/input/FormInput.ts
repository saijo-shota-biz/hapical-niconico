import { RefCallBack } from 'react-hook-form';

export type FormInput = {
  value?: any;
  onChange?: (value: any) => void;
  forwardRef?: RefCallBack;
  error?: boolean;
  helperText?: string;
};
