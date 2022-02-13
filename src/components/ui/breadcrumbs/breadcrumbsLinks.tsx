import { CalendarToday, EventNote, Home, List, ManageAccounts, Settings } from '@mui/icons-material';
import { BreadcrumbsType } from '@ui/breadcrumbs/BreadcrumbsType';

export const HomeBreadcrumbs = (): BreadcrumbsType => ({
  label: 'ホーム',
  Icon: Home,
  link: '/',
});

export const CalendarsBreadcrumbs = (): BreadcrumbsType => ({
  label: 'カレンダー一覧',
  Icon: List,
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

export const CalendarReportBreadcrumbs = (calendarId: string) => ({
  label: 'レポート',
  Icon: EventNote,
  link: `/calendars/${calendarId}`,
});

export const CalendarSettingsBreadcrumbs = (calendarId: string) => ({
  label: '設定',
  Icon: Settings,
  link: `/calendars/${calendarId}/settings`,
});

export const AccountBreadcrumbs = () => ({
  label: 'アカウント設定',
  Icon: ManageAccounts,
  link: '/account',
});