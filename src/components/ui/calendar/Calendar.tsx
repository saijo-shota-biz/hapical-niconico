import { useDate } from '@hooks/util/useDate';
import { Box } from '@mui/material';
import { Label } from '@ui/typography/Label';
import { useEffect, useState, VFC } from 'react';

type Props = {
  baseDate: Date;
};

export const Calendar: VFC<Props> = ({ baseDate }) => {
  const { isToday } = useDate();
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
    if (date.getMonth() !== baseDate.getMonth()) {
      return { color: 'grey.500' };
    }
    return {};
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
              key={`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`}
              sx={{
                border: 'solid 1px',
                borderColor: 'grey.200',
                borderCollapse: 'collapse',
                padding: 1,
                height: 'calc(100% / 6)',
                width: 'calc(100% / 7)',
                backgroundColor: 'common.white',
              }}
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
                  {`${date.getDate() === 1 ? `${date.getMonth() + 1}/` : ''}${date.getDate()}`}
                </Label>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
