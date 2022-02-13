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

  const parseDateFromString = (dateString: string) => {
    return new Date(dateString);
  };

  const parseDateFromYmd = (year: number, month: number, date: number) => {
    return new Date(year, month, date);
  };

  const formatYmd = (date: Date) => {
    const monthString = `${date.getMonth() + 1}`.padStart(2, '0');
    const dateString = `${date.getDate()}`.padStart(2, '0');
    return `${date.getFullYear()}/${monthString}/${dateString}`;
  };

  const formatYm = (date: Date) => {
    return `${date.getFullYear()}/${date.getMonth() + 1}`;
  };

  const formatMd = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}`;
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
    parseDateFromString,
    parseDateFromYmd,
    formatYmd,
    formatYm,
    formatMd,
    nextMonth,
    prevMonth,
    beforeDate,
    isToday,
    isAfterToday,
    isThisMonth,
    isSameYmd,
    isSameYm,
  };
};
