import { CalendarAddModal } from '@domain/CalendarAddModal';
import { ReportAddModal } from '@domain/ReportAddModal';
import { useCalendarAddModal } from '@hooks/components/useCalendarAddModal';
import { useReportAddModal } from '@hooks/components/useReportAddModal';
import { useCalendarCommand } from '@hooks/domain/command/useCalendarCommand';
import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { useCalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import { useDate } from '@hooks/util/useDate';
import { useHandler } from '@hooks/util/useHandler';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { useRouter } from '@hooks/util/useRouter';
import { SelectChangeEvent, Tab, Tabs } from '@mui/material';
import { CalendarPageCalendarTab } from '@page/CalendarPageCalendarTab';
import { CalendarPageReportTab } from '@page/CalendarPageReportTab';
import { Breadcrumbs } from '@ui/breadcrumbs/Breadcrumbs';
import { CalendarBreadcrumbs, CalendarSettingsBreadcrumbs, HomeBreadcrumbs } from '@ui/breadcrumbs/breadcrumbsLinks';
import { FloatingButton } from '@ui/button/FloatingButton';
import { InputSelect } from '@ui/input/InputSelect';
import { SyntheticEvent, useEffect, useState, VFC } from 'react';

export const CalendarPage: VFC = () => {
  const {
    params: { calendarId = '' },
    push,
  } = useRouter();
  const { loginUser } = useLoginUser();

  const { calendars } = useCalendarsQuery();

  const { calendar, setQueryCalendarId, setQueryDateRange, setQueryMonth } = useCalendarQuery();

  const breadcrumbs = [
    HomeBreadcrumbs(),
    CalendarBreadcrumbs(calendarId, calendar?.name, 'current'),
    CalendarSettingsBreadcrumbs(calendarId, 'next'),
  ];

  const today = new Date();
  const [baseDate, setBaseDate] = useState(today);

  const { getRangeMonth } = useDate();
  const { start, end } = getRangeMonth(today.getFullYear(), today.getMonth());
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log({ calendarId, startDate, endDate, value });
    if (calendarId) {
      setQueryCalendarId(calendarId);
    }
    if (value === 0) {
      setQueryMonth(baseDate);
    }
    if (value === 1) {
      setQueryDateRange(startDate, endDate);
    }
  }, [calendarId, baseDate, startDate, endDate, value]);

  const { handleAsyncEvent } = useHandler();
  const { addReport } = useCalendarCommand();
  const { parseDateFromString } = useDate();
  const { showReportAddModal, closeReportAddModal } = useReportAddModal();
  const onClickAddButton = handleAsyncEvent(async (date: Date = new Date()) => {
    const result = await showReportAddModal(date);
    if (result) {
      const date = parseDateFromString(result.date);
      await addReport(
        {
          calendarId: result.calendarId,
          userId: loginUser?.uid || '',
          date,
          emotion: result.emotion,
          comment: result.comment,
        },
        result.uid
      );
      closeReportAddModal();
    }
  });
  useEffect(() => {
    return () => closeReportAddModal();
  }, []);

  const { showCalendarAddModal, closeCalendarAddModal } = useCalendarAddModal();
  const { createCalendar } = useCalendarCommand();
  const onChangeSelect = handleAsyncEvent(async (e: SelectChangeEvent) => {
    if (e.target.value === 'new') {
      const result = await showCalendarAddModal();
      if (result && loginUser) {
        await createCalendar(loginUser, result.name);
        closeCalendarAddModal();
      }
    } else {
      push(`/calendars/${e.target.value}`);
    }
  });
  useEffect(() => {
    return () => closeCalendarAddModal();
  }, []);

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <InputSelect
        inputSx={{
          borderRadius: 0,
          ' .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
        MenuProps={{
          sx: {
            ' .MuiPaper-root': {
              left: '0 !important',
            },
          },
        }}
        value={calendarId}
        options={[
          ...calendars.map((e) => ({ label: e.name, value: e.uid })),
          { label: '新しくカレンダーを作成する', value: 'new' },
        ]}
        onChange={onChangeSelect}
      />
      <Tabs value={value} onChange={handleChange}>
        <Tab label="カレンダー" />
        <Tab label="記録サマリー" />
      </Tabs>
      {value === 0 && <CalendarPageCalendarTab baseDate={baseDate} setBaseDate={setBaseDate} />}
      {value === 1 && (
        <CalendarPageReportTab
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      )}
      <FloatingButton onClick={() => onClickAddButton()} />
      <ReportAddModal />
      <CalendarAddModal />
    </>
  );
};
