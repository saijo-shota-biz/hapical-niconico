import { useDate } from '@hooks/util/useDate';
import { Box, SxProps } from '@mui/material';
import { Label } from '@ui/typography/Label';
import { ReactNode, VFC } from 'react';

type Props = {
  children: ReactNode;
  sx?: SxProps;
  dateList: Date[];
};

export const EmotionHeatMap: VFC<Props> = ({ children, sx = {}, dateList }) => {
  const { formatYmd, formatMd } = useDate();

  return (
    <Box sx={{ position: 'relative', overflowX: 'auto', ...sx }}>
      {children}
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            position: 'sticky',
            left: 0,
            backgroundColor: 'common.white',
          }}
        >
          <Box
            sx={{
              width: '40px',
              height: '40px',
              flexShrink: 0,
              marginRight: 1,
            }}
          />
        </Box>
        {dateList.map((date, i) => (
          <Box
            key={date.toISOString()}
            sx={{
              width: '40px',
              border: '1px solid',
              borderColor: 'grey.200',
              borderCollapse: 'collapse',
              flexShrink: 0,
              writingMode: 'vertical-lr',
            }}
          >
            <Label>
              {date.getMonth() === 0 && date.getDate() === 1
                ? formatYmd(date)
                : date.getDate() === 1 || i === 0
                ? formatMd(date)
                : `${date.getDate()}`.padStart(2, '0')}
            </Label>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
