import { EmotionIcon } from '@domain/icon/EmotionIcon';
import { useHandleAddReport } from '@hooks/components/useHandleAddReport';
import { useCalendarReportsQuery } from '@hooks/domain/query/useCalendarReportsQuery';
import { useDate } from '@hooks/util/useDate';
import { Box, useMediaQuery } from '@mui/material';
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

  const handleAddReport = useHandleAddReport();

  const smartPhone = useMediaQuery('(max-width:600px)');
  const handleOnClick = () => {
    if (smartPhone) {
      handleAddReport(report ? { reportId: report.uid } : { date });
    } else if (isSameYm(baseDate, date)) {
      selectDate(date);
    }
  };

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}
      onClick={handleOnClick}
    >
      {report && <EmotionIcon emotion={report.emotion} sx={{ width: avatarSize, height: avatarSize }} />}
    </Box>
  );
};
