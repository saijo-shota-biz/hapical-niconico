import { AppLayout } from '@domain/AppLayout';
import { CalendarIdRequiredPage } from '@function/CalendarIdRequiredPage';
import { PublicPage } from '@function/PublicPage';
import { SecurityPage } from '@function/SecurityPage';
import { AccountPage } from '@page/AccountPage';
import { CalendarPage } from '@page/CalendarPage';
import { CalendarSettingsPage } from '@page/CalendarSettingsPage';
import { EntryPage } from '@page/EntryPage';
import { HomePage } from '@page/HomePage';
import { PasswordResetPage } from '@page/PasswordResetPage';
import { SignupPage } from '@page/SignupPage';
import { SinginPage } from '@page/SinginPage';
import { VFC } from 'react';
import { Route, Routes } from 'react-router-dom';

export const RoutesProvider: VFC = () => {
  return (
    <Routes>
      <Route element={<SecurityPage />}>
        <Route element={<AppLayout />}>
          <Route element={<CalendarIdRequiredPage />}>
            <Route path={'/calendars/:calendarId'} element={<CalendarPage />} />
            <Route path={'/calendars/:calendarId/settings'} element={<CalendarSettingsPage />} />
          </Route>
          <Route path={'/calendars/:calendarId/entry'} element={<EntryPage />} />
          <Route path={'/account'} element={<AccountPage />} />
        </Route>
      </Route>

      <Route element={<PublicPage />}>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/signin'} element={<SinginPage />} />
        <Route path={'/signup'} element={<SignupPage />} />
        <Route path={'/password-reset'} element={<PasswordResetPage />} />
      </Route>
    </Routes>
  );
};
