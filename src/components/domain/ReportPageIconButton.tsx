import { useRouter } from '@hooks/util/useRouter';
import { EventNote } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { VFC } from 'react';

type Props = {
  calendarId: string;
};

export const ReportPageIconButton: VFC<Props> = ({ calendarId }) => {
  const { push } = useRouter();
  return (
    <Tooltip title={'レポートページに移動'} placement={'top-start'}>
      <IconButton onClick={() => push(`/calendars/${calendarId}/report`)}>
        <EventNote />
      </IconButton>
    </Tooltip>
  );
};
