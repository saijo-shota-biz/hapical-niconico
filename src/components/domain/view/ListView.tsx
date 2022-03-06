import { EmotionIcon } from '@domain/EmotionIcon';
import { UserAvatar } from '@domain/UserAvatar';
import { ListViewEmpty } from '@domain/view/ListViewEmpty';
import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { useCalendarReportsQuery } from '@hooks/domain/query/useCalendarReportsQuery';
import { useDate } from '@hooks/util/useDate';
import { List, ListItem, ListItemAvatar, ListItemText, ListSubheader } from '@mui/material';
import { VFC } from 'react';

type Props = {
  baseDate: Date;
};

export const ListView: VFC<Props> = ({ baseDate }) => {
  const { calendar } = useCalendarQuery();
  const { reports } = useCalendarReportsQuery();

  const { formatYmdw, isSameYmd } = useDate();

  const getUser = (userId: string) => {
    return calendar?.users.find((user) => user.uid === userId);
  };

  if (reports.length === 0) {
    return <ListViewEmpty baseDate={baseDate} />;
  }

  return (
    <List
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'auto',
        border: 'solid 1px',
        borderColor: 'grey.200',
        padding: 2,
        '& ul': { padding: 0 },
        backgroundColor: 'common.white',
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
              <ListSubheader sx={{ borderBottom: 'solid 1px', borderBottomColor: 'grey.200', top: '-16px' }}>
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
                    <ListItemText sx={{ whiteSpace: 'pre-wrap' }}>{report.comment}</ListItemText>
                  </ListItem>
                ))}
            </ul>
          </li>
        ))}
    </List>
  );
};
