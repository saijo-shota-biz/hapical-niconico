import { CalendarToday, ManageAccounts, Settings } from '@mui/icons-material';
import { BreadcrumbsPosition, BreadcrumbsType } from '@ui/breadcrumbs/BreadcrumbsType';

export const CalendarBreadcrumbs = (
  calendarId: string,
  calendarName: string = '名無しのカレンダー',
  position: BreadcrumbsPosition = 'prev'
): BreadcrumbsType => ({
  label: calendarName,
  Icon: CalendarToday,
  link: `/calendars/${calendarId}`,
  position,
});

export const CalendarSettingsBreadcrumbs = (
  calendarId: string,
  position: BreadcrumbsPosition = 'prev'
): BreadcrumbsType => ({
  label: '設定',
  Icon: Settings,
  link: `/calendars/${calendarId}/settings`,
  position,
});

export const AccountBreadcrumbs = (position: BreadcrumbsPosition = 'prev'): BreadcrumbsType => ({
  label: 'アカウント設定',
  Icon: ManageAccounts,
  link: '/account',
  position,
});
