export const useDate = () => {
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

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  const isThisMonth = (date: Date) => {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth();
  };

  return { formatYmd, formatYm, formatMd, nextMonth, prevMonth, isToday, isThisMonth };
};
