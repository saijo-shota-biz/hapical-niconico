import { CalendarToday, Edit } from '@mui/icons-material';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { VFC } from 'react';

type Props = {
  onClickAddReport: () => void;
  onClickAddCalendar: () => void;
};

export const FloatingButton: VFC<Props> = ({ onClickAddReport, onClickAddCalendar }) => {
  return (
    <SpeedDial
      ariaLabel="action"
      sx={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 9 }}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction icon={<Edit color={'primary'} />} tooltipTitle={'日記を書く'} onClick={onClickAddReport} />
      <SpeedDialAction
        icon={<CalendarToday color={'primary'} />}
        tooltipTitle={'カレンダーを作る'}
        onClick={onClickAddCalendar}
      />
    </SpeedDial>
  );
};
