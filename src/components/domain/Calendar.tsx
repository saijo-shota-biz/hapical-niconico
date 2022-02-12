import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { useDate } from '@hooks/util/useDate';
import { useEmotion } from '@hooks/util/useEmotion';
import { Box } from '@mui/material';
import { Label } from '@ui/typography/Label';
import { useEffect, useState, VFC } from 'react';

import { CalendarReport } from '@/types/Calendar';

type Props = {
  baseDate: Date;
  onClickDate: (date: Date) => void;
};

export const Calendar: VFC<Props> = ({ baseDate, onClickDate }) => {
  const { formatYmd, formatMd, isToday, isAfterToday, isSameYmd, isSameYm } = useDate();
  const { getEmotionText } = useEmotion();
  const { calendar } = useCalendarQuery();
  const [dateList, setDateList] = useState<Date[]>([]);

  useEffect(() => {
    setDateList(
      [...Array(42)].map((_, i) => {
        const date = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
        date.setDate(date.getDate() - date.getDay() + i);
        return date;
      })
    );
  }, [baseDate]);

  const getDayColor = (dayNum: number) => {
    if (dayNum === 0) {
      return { color: 'red' };
    }
    if (dayNum === 6) {
      return { color: 'blue' };
    }
    return {};
  };

  const getTodayColor = (date: Date) => {
    if (isToday(date)) {
      return { color: 'common.white' };
    }
    return {};
  };

  const getThisMonthColor = (date: Date) => {
    if (!isSameYm(baseDate, date)) {
      return { color: 'grey.500' };
    }
    return {};
  };

  const getReports = (date: Date): CalendarReport[] => {
    return calendar?.reports.filter((e) => isSameYmd(e.date, date)) || [];
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
          {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((e, i) => (
            <Box
              key={e}
              sx={{
                border: 'solid 1px',
                borderColor: 'grey.200',
                borderCollapse: 'collapse',
                height: '40px',
                width: 'calc(100% / 7)',
                padding: 1,
                backgroundColor: 'grey.100',
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
                padding: 1,
                height: 'calc(100% / 6)',
                width: 'calc(100% / 7)',
                backgroundColor: 'common.white',
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
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: isToday(date) ? 'primary.main' : '',
                }}
              >
                <Label
                  sx={{
                    ...getDayColor(date.getDay()),
                    ...getThisMonthColor(date),
                    ...getTodayColor(date),
                  }}
                >
                  {date.getDate() === 1 ? formatMd(date) : date.getDate()}
                </Label>
              </Box>
              <Box>
                {getReports(date).map((e) => (
                  <Label key={e.uid}>{getEmotionText(e.emotion)}</Label>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
