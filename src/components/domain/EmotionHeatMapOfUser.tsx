import { EmotionHeatMapCell, EmotionHeatMapIcon } from '@domain/EmotionHeatMap';
import { UserAvatar } from '@domain/UserAvatar';
import { useDate } from '@hooks/util/useDate';
import { useEmotion } from '@hooks/util/useEmotion';
import { SxProps } from '@mui/material';
import { TableRow } from '@ui/table/TableRow';
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
          <EmotionHeatMapIcon>
            <UserAvatar title={user.name} user={user} />
          </EmotionHeatMapIcon>
          {dateList.map((date) => {
            const report = reports.find((report) => report.userId === user.uid && isSameYmd(date, report.date));
            return (
              <EmotionHeatMapCell
                key={date.toISOString()}
                backgroundColor={(report && getEmotionIconColor(report.emotion)) || ''}
              />
            );
          })}
        </TableRow>
      ))}
    </>
  );
};
