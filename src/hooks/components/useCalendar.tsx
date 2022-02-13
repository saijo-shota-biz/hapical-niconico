import { useDate } from '@hooks/util/useDate';
import { useEffect, useState } from 'react';

export const useCalendar = (baseDate: Date) => {
  const { isToday, isSameYm } = useDate();
  const [dateList, setDateList] = useState<Date[]>([]);
  const dayList = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

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
    if (!isSameYm(baseDate, date)) {
      return { color: 'grey.500' };
    }
    return {};
  };

  return {
    dateList,
    dayList,
    getDayColor,
    getTodayColor,
    getThisMonthColor,
  };
};
