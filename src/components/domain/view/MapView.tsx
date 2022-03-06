import { MapViewDataBody } from '@domain/view/MapViewDataBody';
import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { useDate } from '@hooks/util/useDate';
import { useWindowSize } from '@hooks/util/useWindowSize';
import { Box } from '@mui/material';
import { chunk } from '@utils/chunk';
import { useEffect, useState, VFC } from 'react';

type Props = {
  baseDate: Date;
};

const cellSize = 48;

export const MapView: VFC<Props> = ({ baseDate }) => {
  const { formatMd, getRangeMonth, getDateList, isToday } = useDate();
  const { start, end } = getRangeMonth(baseDate.getFullYear(), baseDate.getMonth());

  const { width } = useWindowSize();
  const [cellLength, setCellLength] = useState<number>(0);
  const dateLists: (Date | null)[][] = chunk(getDateList(start, end), cellLength) //
    .map((dateList) => {
      if (dateList.length === cellLength) {
        return [null, ...dateList];
      }
      const length = cellLength - [null, ...dateList].length + 1;
      const array = new Array(length).map(() => null);
      return [null, ...dateList, ...array];
    });

  useEffect(() => {
    setCellLength(Math.floor((width - 34 - cellSize) / cellSize));
  }, [width]);

  const { calendar } = useCalendarQuery();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {dateLists.map((dates, i) => (
        <Box key={`dates-${i}`} sx={{ display: 'flex', justifyContent: 'center' }}>
          {dates.map((date, j) => (
            <Box key={`date-${j}`} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  border: 'solid 1px',
                  borderColor: date && isToday(date) ? 'secondary.main' : 'grey.200',
                  backgroundColor: 'grey.100',
                  width: cellSize,
                  height: cellSize,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {date && formatMd(date)}
              </Box>
              {calendar?.users.map((e, k) => {
                return (
                  <Box
                    key={`user-emotion-${k}`}
                    sx={{
                      border: 'solid 1px',
                      borderColor: 'grey.200',
                      borderCollapse: 'collapse',
                      backgroundColor: 'common.white',
                      width: cellSize,
                      height: cellSize,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      ':hover': {
                        borderColor: 'primary.main',
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    <MapViewDataBody isFirst={j === 0} date={date} user={e} />
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};
