import { useDate } from '@hooks/util/useDate';
import { atom, useRecoilState } from 'recoil';

export const CalendarQueryDateState = atom<{ start: Date | null; end: Date | null }>({
  key: 'StateCalendarQueryDate',
  default: {
    start: null,
    end: null,
  },
});

export const useCalendarReportsQueryDate = () => {
  const [dateQuery, setDateQuery] = useRecoilState(CalendarQueryDateState);

  const { getRangeMonth, isSameYmd } = useDate();

  const setQueryMonth = (baseDate: Date) => {
    const { start, end } = getRangeMonth(baseDate.getFullYear(), baseDate.getMonth());
    if (dateQuery.start && dateQuery.end && isSameYmd(start, dateQuery.start) && isSameYmd(end, dateQuery.end)) {
      return;
    }
    setDateQuery({ start, end });
  };

  return { setQueryMonth };
};
