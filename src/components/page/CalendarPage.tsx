import { useHandleAddCalendar } from '@hooks/components/useHandleAddCalendar';
import { useHandleAddReport } from '@hooks/components/useHandleAddReport';
import { useCalendarsQuery } from '@hooks/domain/query/useCalendarsQuery';
import { useRouter } from '@hooks/util/useRouter';
import { SelectChangeEvent } from '@mui/material';
import { CalendarPageContent } from '@page/CalendarPageContent';
import { FloatingButton } from '@ui/button/FloatingButton';
import { InputSelect } from '@ui/input/InputSelect';
import { VFC } from 'react';

export const CalendarPage: VFC = () => {
  const {
    params: { calendarId = '' },
    push,
  } = useRouter();
  const { calendars } = useCalendarsQuery();

  const handleAddReport = useHandleAddReport();
  const handleAddCalendar = useHandleAddCalendar();

  const onChangeSelect = async (e: SelectChangeEvent) => {
    push(`/calendars/${e.target.value}`);
  };

  return (
    <>
      <InputSelect
        inputSx={{
          borderRadius: 0,
          ' .MuiOutlinedInput-notchedOutline': { border: 'none' },
          ' .MuiSelect-select': { padding: '12px 16px' },
        }}
        MenuProps={{ sx: { ' .MuiPaper-root': { left: '0 !important' } } }}
        value={calendarId}
        options={calendars.map((e) => ({ label: e.name, value: e.uid }))}
        onChange={onChangeSelect}
      />
      <CalendarPageContent />
      <FloatingButton
        onClickAddReport={() => handleAddReport({ date: new Date() })}
        onClickAddCalendar={() => handleAddCalendar()}
      />
    </>
  );
};
