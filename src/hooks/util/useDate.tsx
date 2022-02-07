export const useDate = () => {
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
