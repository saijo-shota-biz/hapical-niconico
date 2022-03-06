import { EmotionIcon } from '@domain/icon/EmotionIcon';
import { useHandleAddReport } from '@hooks/components/useHandleAddReport';
import { useCalendarReportsQuery } from '@hooks/domain/query/useCalendarReportsQuery';
import { useDate } from '@hooks/util/useDate';
import { Box, Tooltip } from '@mui/material';
import { VFC } from 'react';

type Props = {
  date: Date;
  size: number;
};

export const CalendarViewDateBody: VFC<Props> = ({ date, size }) => {
  const { reports } = useCalendarReportsQuery();

  const { isSameYmd } = useDate();

  const report = reports.find((e) => isSameYmd(e.date, date));

  const avatarSize = (size - 20) * 0.75;

  const handleAddReport = useHandleAddReport();

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}
      onClick={() => (report ? handleAddReport({ reportId: report.uid }) : handleAddReport({ date }))}
    >
      {report && (
        <Tooltip
          arrow
          placement={'top'}
          title={report.comment && <Box sx={{ whiteSpace: 'pre-wrap' }}>{report.comment}</Box>}
        >
          <EmotionIcon emotion={report.emotion} sx={{ width: avatarSize, height: avatarSize }} />
        </Tooltip>
      )}
    </Box>
  );
};
