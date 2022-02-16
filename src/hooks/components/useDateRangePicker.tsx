import { useDate } from '@hooks/util/useDate';
import { useState } from 'react';

export const useDateRangePicker = () => {
  const { getRangeWeek } = useDate();
  const today = new Date();
  const { start, end } = getRangeWeek(today.getFullYear(), today.getMonth(), today.getDate());
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  return { startDate, setStartDate, endDate, setEndDate };
};
