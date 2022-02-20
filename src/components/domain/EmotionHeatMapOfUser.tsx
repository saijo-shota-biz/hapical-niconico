import { UserAvatar } from '@domain/UserAvatar';
import { useDate } from '@hooks/util/useDate';
import { useEmotion } from '@hooks/util/useEmotion';
import { SxProps, TableCell, TableRow } from '@mui/material';
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
    <>
      {users.map((user) => (
        <TableRow key={user.uid}>
          <TableCell
            sx={{
              position: 'sticky',
              left: 0,
              backgroundColor: 'common.white',
              marginX: 1,
              width: '40px',
              height: '40px',
              border: 'none',
              padding: 1,
            }}
          >
            <UserAvatar title={user.name} user={user} />
          </TableCell>
          {dateList.map((date) => {
            const report = reports.find((report) => report.userId === user.uid && isSameYmd(date, report.date));
            return (
              <TableCell
                key={date.toISOString()}
                sx={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderCollapse: 'collapse',
                  flexShrink: 0,
                  ...(report ? { backgroundColor: getEmotionIconColor(report.emotion) } : {}),
                }}
              />
            );
          })}
        </TableRow>
      ))}
    </>
  );
};
