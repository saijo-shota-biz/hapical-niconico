import { EmotionHeatMap } from '@domain/EmotionHeatMap';
import { UserAvatar } from '@domain/UserAvatar';
import { useDate } from '@hooks/util/useDate';
import { useEmotion } from '@hooks/util/useEmotion';
import { Box, SxProps } from '@mui/material';
import { VFC } from 'react';

import { CalendarReport } from '@/types/Calendar';
import { User } from '@/types/User';

type Props = {
  startDate: Date;
  endDate: Date;
  reports: CalendarReport[];
  users: User[];
  sx?: SxProps;
};

export const EmotionHeatMapOfUser: VFC<Props> = ({ startDate, endDate, reports, users, sx = {} }) => {
  const { getDateList } = useDate();
  const { isSameYmd } = useDate();
  const { getEmotionIconColor } = useEmotion();

  const dateList = getDateList(startDate, endDate);

  return (
    <EmotionHeatMap dateList={dateList} sx={sx}>
      {users.map((user) => (
        <Box key={user.uid} sx={{ display: 'flex' }}>
          <Box sx={{ position: 'sticky', left: 0, backgroundColor: 'common.white' }}>
            <UserAvatar title={user.name} user={user} sx={{ marginRight: 1 }} />
          </Box>
          {dateList.map((date) => {
            const report = reports.find((report) => report.userId === user.uid && isSameYmd(date, report.date));
            return (
              <Box
                key={date.toISOString()}
                sx={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  flexShrink: 0,
                  ...(report ? { backgroundColor: getEmotionIconColor(report.emotion) } : {}),
                }}
              />
            );
          })}
        </Box>
      ))}
    </EmotionHeatMap>
  );
};
