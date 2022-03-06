export const useDate = () => {
  const getRangeMonth = (year: number, month: number) => {
    const start = parseDateFromYmd(year, month, 1);
    const end = parseDateFromYmd(year, month + 1, 0);
    return { start, end };
  };

  const getRangeYear = (year: number) => {
    const start = parseDateFromYmd(year, 0, 1);
    const end = parseDateFromYmd(year, 12, 0);
    return { start, end };
  };

  const getRangeWeek = (year: number, month: number, date: number) => {
    const start = parseDateFromYmd(year, month, date - 6);
    const end = parseDateFromYmd(year, month, date);
    return { start, end };
  };

  const getDateList = (startDate: Date, endDate: Date) => {
    const timeDiff = endDate.getTime() - startDate.getTime();
    const dateDiff = Math.abs(Math.floor(timeDiff / (1000 * 60 * 60 * 24))) + 1;
    return [...Array(dateDiff)].map((_, i) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      return date;
    });
  };

  const parseDateFromString = (dateString: string) => {
    return new Date(dateString);
  };

  const parseDateFromYmd = (year: number, month: number, date: number) => {
    return new Date(year, month, date);
  };

  const formatYmd = (date: Date) => {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  const formatYm = (date: Date) => {
    return `${date.getFullYear()}/${date.getMonth() + 1}`;
  };

  const formatMd = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const formatYmdw = (date: Date) => {
    const dayOfWeeks = ['日', '月', '火', '水', '木', '金', '土'];
    return `${formatYmd(date)}  (${dayOfWeeks[date.getDay()]})`;
  };

  const nextMonth = (date: Date) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    return newDate;
  };

  const prevMonth = (date: Date) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    return newDate;
  };

  const beforeDate = (date: Date, length: number) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - length);
    return newDate;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const isBeforeToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() < today.getFullYear() ||
      date.getMonth() < today.getMonth() ||
      (date.getMonth() === today.getMonth() && date.getDate() < today.getDate())
    );
  };

  const isAfterToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() > today.getFullYear() ||
      date.getMonth() > today.getMonth() ||
      (date.getMonth() === today.getMonth() && date.getDate() > today.getDate())
    );
  };

  const isThisMonth = (date: Date) => {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth();
  };

  const isSameYmd = (date1: Date, date2: Date) => {
    return formatYmd(date1) === formatYmd(date2);
  };

  const isSameYm = (date1: Date, date2: Date) => {
    return formatYm(date1) === formatYm(date2);
  };

  return {
    getRangeMonth,
    getRangeYear,
    getRangeWeek,
    getDateList,
    parseDateFromString,
    parseDateFromYmd,
    formatYmd,
    formatYm,
    formatMd,
    formatYmdw,
    nextMonth,
    prevMonth,
    beforeDate,
    isToday,
    isBeforeToday,
    isAfterToday,
    isThisMonth,
    isSameYmd,
    isSameYm,
  };
};
