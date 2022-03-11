import { EmotionIcon } from '@domain/icon/EmotionIcon';
import { useCalendarReportsQuery } from '@hooks/domain/query/useCalendarReportsQuery';
import { useDate } from '@hooks/util/useDate';
import { Box } from '@mui/material';
import { Dispatch, SetStateAction, VFC } from 'react';

type Props = {
  baseDate: Date;
  date: Date;
  size: number;
  selectDate: Dispatch<SetStateAction<Date>>;
};

export const CalendarViewDateBody: VFC<Props> = ({ baseDate, date, size, selectDate }) => {
  const { reports } = useCalendarReportsQuery();

  const { isSameYmd, isSameYm } = useDate();

  const report = reports.find((e) => isSameYmd(e.date, date));

  const avatarSize = (size - 20) * 0.75;

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}
      onClick={() => (isSameYm(baseDate, date) ? selectDate(date) : null)}
    >
      {report && <EmotionIcon emotion={report.emotion} sx={{ width: avatarSize, height: avatarSize }} />}
    </Box>
  );
};
