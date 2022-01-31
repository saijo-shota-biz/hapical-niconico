import { Box } from '@mui/material';
import { Label } from '@ui/typography/Label';
import { useEffect, useState, VFC } from 'react';

export const CalendarPage: VFC = () => {
  const [baseDate, setBaseDate] = useState(new Date());
  const [dateList, setDateList] = useState<Date[]>([]);

  useEffect(() => {
    setDateList(
      [...Array(98)].map((_, i) => {
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

  const getThisMonthColor = (date: Date) => {
    if (date.getMonth() !== baseDate.getMonth()) {
      return { color: 'grey.400' };
    }
    return {};
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', overflowY: 'scroll', height: '100%' }}>
          {dateList.map((date) => (
            <Box
              key={`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}
              sx={{
                border: 'solid 1px',
                borderColor: 'grey.200',
                borderCollapse: 'collapse',
                padding: 1,
                height: 'calc(100% / 6)',
                width: 'calc(100% / 7)',
              }}
            >
              <Label
                sx={{
                  ...getDayColor(date.getDay()),
                  ...getThisMonthColor(date),
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {`${date.getDate() === 1 ? `${date.getMonth() + 1}/` : ''}${date.getDate()}`}
              </Label>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
