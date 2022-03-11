import { CalendarViewDateBody } from '@domain/view/CalendarViewDateBody';
import { CalendarViewDetail } from '@domain/view/CalendarViewDetail';
import { useCalendar } from '@hooks/components/useCalendar';
import { useDate } from '@hooks/util/useDate';
import { useWindowSize } from '@hooks/util/useWindowSize';
import { Box, useMediaQuery } from '@mui/material';
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

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    setDateElemSize((width - 34) / 7);
  }, [width]);

  const smartPhone = useMediaQuery('(max-width:600px)');
  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: smartPhone ? 'column' : 'row' }}>
      <Box
        sx={{
          ...(smartPhone
            ? {}
            : {
                width: '100%',
                height: '100%',
              }),
          display: 'flex',
          flexDirection: 'column',
          ...(smartPhone
            ? {}
            : {
                flexGrow: 1,
                flexBasis: 0,
              }),
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
                width: smartPhone ? dateElemSize : dateElemSize / 2,
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
            <Box key={`week-${i}`} sx={{ display: 'flex', height: smartPhone ? dateElemSize : dateElemSize / 2 }}>
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
                    width: smartPhone ? dateElemSize : dateElemSize / 2,
                    height: smartPhone ? dateElemSize : dateElemSize / 2,
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
                  <CalendarViewDateBody
                    baseDate={baseDate}
                    date={date}
                    size={smartPhone ? dateElemSize : dateElemSize / 2}
                    selectDate={setSelectedDate}
                  />
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
      <CalendarViewDetail date={selectedDate} />
    </Box>
  );
};
