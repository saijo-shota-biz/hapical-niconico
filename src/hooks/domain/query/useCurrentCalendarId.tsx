import { atom, useRecoilState } from 'recoil';

export const CalendarQueryCalendarIdState = atom<string>({
  key: 'StateCalendarQueryCalendarId',
  default: '',
});

export const useCurrentCalendarId = () => {
  const [calendarIdQuery, setCalendarIdQuery] = useRecoilState(CalendarQueryCalendarIdState);

  const setQueryCalendarId = (calendarId: string) => {
    if (calendarIdQuery && calendarIdQuery === calendarId) {
      return;
    }
    setCalendarIdQuery(calendarId);
  };

  return { calendarId: calendarIdQuery, setQueryCalendarId };
};
