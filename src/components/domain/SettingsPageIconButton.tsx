import { useRouter } from '@hooks/util/useRouter';
import { Settings } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { VFC } from 'react';

type Props = {
  calendarId: string;
};

export const SettingsPageIconButton: VFC<Props> = ({ calendarId }) => {
  const { push } = useRouter();

  return (
    <Tooltip title={'カレンダー設定ページに移動'} placement={'top'} arrow>
      <IconButton onClick={() => push(`/calendars/${calendarId}/settings`)}>
        <Settings />
      </IconButton>
    </Tooltip>
  );
};
