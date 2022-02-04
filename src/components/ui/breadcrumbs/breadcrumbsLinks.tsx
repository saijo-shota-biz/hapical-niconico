import { CalendarToday, Home } from '@mui/icons-material';
import { BreadcrumbsType } from '@ui/breadcrumbs/BreadcrumbsType';

export const HomeBreadcrumbs = (): BreadcrumbsType => ({
  label: 'ホーム',
  Icon: Home,
  link: '/',
});

export const CalendarsBreadcrumbs = (): BreadcrumbsType => ({
  label: 'カレンダー',
  Icon: CalendarToday,
  link: '/calendars',
});

export const CalendarBreadcrumbs = (calendarName: string, calendarId: string): BreadcrumbsType => ({
  label: `${calendarName}のカレンダー`,
  Icon: CalendarToday,
  link: `/calendars/${calendarId}`,
});
