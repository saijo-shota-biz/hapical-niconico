import { EmotionIcon } from '@domain/EmotionIcon';
import { UserAvatar } from '@domain/UserAvatar';
import { useDate } from '@hooks/util/useDate';
import { List, ListItem, ListItemAvatar, ListItemText, ListSubheader } from '@mui/material';
import { VFC } from 'react';

import { CalendarReport } from '@/types/Calendar';
import { User } from '@/types/User';

type Props = {
  reports: CalendarReport[];
  users: User[];
};

export const ReportList: VFC<Props> = ({ reports, users }) => {
  const { formatYmdw, isSameYmd } = useDate();

  const getUser = (userId: string) => {
    return users.find((user) => user.uid === userId);
  };

  return (
    <List
      sx={{
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        border: 'solid 1px',
        borderColor: 'grey.200',
        height: '458px',
        padding: 2,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {reports
        .map((e) => e.date)
        .filter((date, i, self) => self.findIndex((d) => d.getTime() === date.getTime()) === i)
        .sort((a, b) => (a > b ? -1 : 1))
        .map((date) => (
          <li key={date.toISOString()}>
            <ul>
              <ListSubheader sx={{ borderBottom: 'solid 1px', borderBottomColor: 'grey.200' }}>
                {`${formatYmdw(date)}`}
              </ListSubheader>
              {reports
                .filter((report) => isSameYmd(report.date, date))
                .map((report) => (
                  <ListItem key={`${report.uid}`} alignItems="flex-start">
                    <ListItemAvatar>
                      <UserAvatar title={getUser(report.userId)?.name} user={getUser(report.userId)} />
                    </ListItemAvatar>
                    <ListItemAvatar>
                      <EmotionIcon emotion={report.emotion} />
                    </ListItemAvatar>
                    <ListItemText primary={`${report.comment}`} />
                  </ListItem>
                ))}
            </ul>
          </li>
        ))}
    </List>
  );
};
