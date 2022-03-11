import { EmotionIcon } from '@domain/icon/EmotionIcon';
import { useHandleAddReport } from '@hooks/components/useHandleAddReport';
import { useCalendarReportsQuery } from '@hooks/domain/query/useCalendarReportsQuery';
import { useDate } from '@hooks/util/useDate';
import { Edit } from '@mui/icons-material';
import { IconButton, useMediaQuery } from '@mui/material';
import { Card } from '@ui/card/Card';
import { CardContent } from '@ui/card/CardContent';
import { CardHeader } from '@ui/card/CardHeader';
import { Description } from '@ui/typography/Description';
import { Label } from '@ui/typography/Label';
import { VFC } from 'react';

type Props = {
  date: Date;
};

export const CalendarViewDetail: VFC<Props> = ({ date }) => {
  const { isSameYmd, formatYmdw } = useDate();

  const { reports } = useCalendarReportsQuery();

  const report = reports.find((e) => isSameYmd(e.date, date));

  const handleAddReport = useHandleAddReport();

  const smartPhone = useMediaQuery('(max-width:600px)');
  return (
    <Card
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
      <CardHeader>
        <Label>{formatYmdw(date)}の日記</Label>
        <IconButton onClick={() => handleAddReport(report ? { reportId: report.uid } : { date })}>
          <Edit />
        </IconButton>
      </CardHeader>
      <CardContent sx={{ display: 'flex', gap: 2, flexGrow: 1, flexBasis: 0 }}>
        {report ? (
          <>
            <EmotionIcon emotion={report.emotion} />
            <Description sx={{ whiteSpace: 'pre-wrap' }}>{report.comment}</Description>
          </>
        ) : (
          <Description>日記がありません。</Description>
        )}
      </CardContent>
    </Card>
  );
};
