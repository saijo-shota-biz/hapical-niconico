import { EmotionIcon } from '@domain/EmotionIcon';
import { useCalendar } from '@hooks/components/useCalendar';
import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { useDate } from '@hooks/util/useDate';
import { useEmotion } from '@hooks/util/useEmotion';
import { Avatar, Badge, Box, Tooltip } from '@mui/material';
import { Label } from '@ui/typography/Label';
import { VFC } from 'react';

import { CalendarReport } from '@/types/Calendar';

type Props = {
  baseDate: Date;
  onClickDate: (date: Date) => void;
};

export const Calendar: VFC<Props> = ({ baseDate, onClickDate }) => {
  const { formatYmd, formatMd, isToday, isAfterToday, isSameYmd } = useDate();
  const { getEmotionIconColor } = useEmotion();
  const { calendar } = useCalendarQuery();

  const { dateList, dayList, getDayColor, getThisMonthColor } = useCalendar(baseDate);

  const getReports = (date: Date): CalendarReport[] => {
    return calendar?.reports.filter((e) => isSameYmd(e.date, date)) || [];
  };

  const getUser = (report: CalendarReport) => {
    return calendar?.users.find((user) => user.uid === report.userId);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          flexBasis: 0,
          border: 'solid 1px',
          borderColor: 'grey.200',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          {dayList.map((e, i) => (
            <Box
              key={e}
              sx={{
                border: 'solid 1px',
                borderColor: 'grey.200',
                borderCollapse: 'collapse',
                height: '40px',
                width: 'calc(100% / 7)',
                padding: 1,
              }}
            >
              <Label
                sx={{
                  ...getDayColor(i),
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                {e}
              </Label>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', height: '100%' }}>
          {dateList.map((date) => (
            <Box
              key={formatYmd(date)}
              sx={{
                border: 'solid 1px',
                borderColor: 'grey.200',
                borderCollapse: 'collapse',
                padding: '4px',
                height: 'calc(100% / 6)',
                width: 'calc(100% / 7)',
                backgroundColor: 'common.white',
                overflow: 'hidden',
                ...(isAfterToday(date)
                  ? {}
                  : {
                      cursor: 'pointer',
                      ':hover': {
                        borderColor: 'primary.main',
                        transform: 'scale(1.1)',
                      },
                    }),
              }}
              onClick={() => isAfterToday(date) || onClickDate(date)}
            >
              <Badge
                color="primary"
                variant="dot"
                invisible={!isToday(date)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '24px',
                  height: '24px',
                }}
              >
                <Label
                  sx={{
                    ...getDayColor(date.getDay()),
                    ...getThisMonthColor(date),
                  }}
                >
                  {date.getDate() === 1 ? formatMd(date) : date.getDate()}
                </Label>
              </Badge>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', paddingLeft: '8px' }}>
                {getReports(date)?.map((e) => (
                  <Tooltip
                    title={
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <Label sx={{ fontSize: '8px' }}>{getUser(e)?.name}</Label>
                        <EmotionIcon emotion={e.emotion} />
                      </Box>
                    }
                    arrow
                    placement={'top'}
                  >
                    <Avatar
                      src={getUser(e)?.picture}
                      sx={{
                        width: '24px',
                        height: '24px',
                        marginLeft: '-8px',
                        border: 'solid 2px',
                        borderColor: getEmotionIconColor(e.emotion),
                      }}
                    />
                  </Tooltip>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
