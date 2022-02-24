import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { MouseEvent, VFC } from 'react';

type Props = {
  showPassword: boolean;
  onClickShowPassword: () => void;
  onMouseDownPassword: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const PasswordVisibilityIconButton: VFC<Props> = ({
  showPassword,
  onClickShowPassword,
  onMouseDownPassword,
}) => {
  return (
    <InputAdornment position="end">
      <IconButton onClick={onClickShowPassword} onMouseDown={onMouseDownPassword} edge="end">
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};
