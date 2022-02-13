import { useRouter } from '@hooks/util/useRouter';
import { CalendarToday } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { VFC } from 'react';

type Props = {
  calendarId: string;
};

export const CalendarPageIconButton: VFC<Props> = ({ calendarId }) => {
  const { push } = useRouter();
  return (
    <Tooltip title={'カレンダーページに移動'} placement={'top'} arrow>
      <IconButton onClick={() => push(`/calendars/${calendarId}`)}>
        <CalendarToday />
      </IconButton>
    </Tooltip>
  );
};
