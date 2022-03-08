import { CalendarViewDateBody } from '@domain/view/CalendarViewDateBody';
import { useCalendar } from '@hooks/components/useCalendar';
import { useDate } from '@hooks/util/useDate';
import { useWindowSize } from '@hooks/util/useWindowSize';
import { Box } from '@mui/material';
import { Label } from '@ui/typography/Label';
import { useEffect, useState, VFC } from 'react';

type Props = {
  baseDate: Date;
};

export const CalendarView: VFC<Props> = ({ baseDate }) => {
  const { formatYmd, formatMd, isToday } = useDate();
  const { dateList, dayList, getDayColor, getThisMonthColor } = useCalendar(baseDate);

  const { width } = useWindowSize();
  const [dateElemSize, setDateElemSize] = useState<number>(0);

  useEffect(() => {
    setDateElemSize((width - 34) / 7);
  }, [width]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
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
              width: dateElemSize,
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
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {dateList.map((weekDateList, i) => (
          <Box key={`week-${i}`} sx={{ display: 'flex', height: dateElemSize }}>
            {weekDateList.map((date) => (
              <Box
                key={formatYmd(date)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: 'solid 1px',
                  borderColor: isToday(date) ? 'secondary.main' : 'grey.200',
                  borderCollapse: 'collapse',
                  padding: '4px',
                  height: dateElemSize,
                  width: dateElemSize,
                  backgroundColor: 'common.white',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  ':hover': {
                    borderColor: 'primary.main',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Label
                  sx={{
                    ...getDayColor(date.getDay()),
                    ...getThisMonthColor(date),
                    fontSize: '12px',
                  }}
                >
                  {date.getDate() === 1 ? formatMd(date) : date.getDate()}
                </Label>
                <CalendarViewDateBody baseDate={baseDate} date={date} size={dateElemSize} />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
