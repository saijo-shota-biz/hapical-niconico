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

export const CalendarBreadcrumbs = (
  calendarName: string = '名無しのカレンダー',
  calendarId: string
): BreadcrumbsType => ({
  label: calendarName,
  Icon: CalendarToday,
  link: `/calendars/${calendarId}`,
});
