import { EmotionIcon } from '@domain/icon/EmotionIcon';
import { UserAvatar } from '@domain/icon/UserAvatar';
import { useHandleAddReport } from '@hooks/components/useHandleAddReport';
import { useCalendarReportsQuery } from '@hooks/domain/query/useCalendarReportsQuery';
import { useDate } from '@hooks/util/useDate';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { Box, Tooltip } from '@mui/material';
import { VFC } from 'react';

import { User } from '@/types/User';

type Props = {
  date: Date | null;
  user: User;
  isFirst: boolean;
};

export const MapViewDataBody: VFC<Props> = ({ date, user, isFirst }) => {
  const { loginUser } = useLoginUser();

  const { isSameYmd } = useDate();
  const { reports } = useCalendarReportsQuery();

  const handleAddReport = useHandleAddReport();

  const report = reports.find((report) => date && isSameYmd(report.date, date) && report.userId === user.uid);

  if (isFirst) {
    return <UserAvatar title={user.name} user={user} />;
  }

  if (!report) {
    return date ? (
      <Box
        onClick={() => loginUser?.uid === user.uid && handleAddReport({ date })}
        sx={{ width: '100%', height: '100%' }}
      />
    ) : null;
  }

  return (
    <Tooltip
      arrow
      placement={'top'}
      title={report.comment && <Box sx={{ whiteSpace: 'pre-wrap' }}>{report.comment}</Box>}
    >
      <EmotionIcon
        emotion={report.emotion}
        onClick={() => loginUser?.uid === user.uid && handleAddReport({ reportId: report.uid })}
      />
    </Tooltip>
  );
};
