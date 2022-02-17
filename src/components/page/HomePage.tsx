import { EmotionHeatMapOfCalendar } from '@domain/EmotionHeatMapOfCalendar';
import { ReportList } from '@domain/ReportList';
import { useDateRangePicker } from '@hooks/components/useDateRangePicker';
import { useCalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import { useMyReportsQuery } from '@hooks/domain/query/useMyReportsQuery';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { useRouter } from '@hooks/util/useRouter';
import { Box } from '@mui/material';
import { Breadcrumbs } from '@ui/breadcrumbs/Breadcrumbs';
import { HomeBreadcrumbs } from '@ui/breadcrumbs/breadcrumbsLinks';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { Card } from '@ui/card/Card';
import { CardContent } from '@ui/card/CardContent';
import { DateRangePicker } from '@ui/input/InputDateRange';
import { useEffect, VFC } from 'react';

export const HomePage: VFC = () => {
  const { push } = useRouter();
  const { loginUser } = useLoginUser();

  const breadcrumbs = [HomeBreadcrumbs()];

  const { calendars } = useCalendarsQuery();
  const { reports, setQueryDateRange } = useMyReportsQuery();

  const { startDate, setStartDate, endDate, setEndDate } = useDateRangePicker();

  useEffect(() => {
    setQueryDateRange(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Card sx={{ margin: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <PrimaryButton onClick={() => push('/calendars')}>カレンダー一覧画面へ</PrimaryButton>
          <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onChangeStartDate={setStartDate}
              onChangeEndDate={setEndDate}
            />
            {loginUser && <ReportList reports={reports} users={[loginUser]} />}
          </Box>
          {calendars && (
            <EmotionHeatMapOfCalendar
              startDate={startDate}
              endDate={endDate}
              reports={reports}
              calendars={calendars}
              sx={{ marginTop: 2 }}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};
