import { UserAvatar } from '@domain/UserAvatar';
import { useDeleteConfirmModal } from '@hooks/components/useDeleteConfirmModal';
import { useCalendarCommand } from '@hooks/domain/command/useCalendarCommand';
import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { useRouter } from '@hooks/util/useRouter';
import { ContentCopy, Link } from '@mui/icons-material';
import { Alert, Box, Divider, IconButton, Tooltip } from '@mui/material';
import { Breadcrumbs } from '@ui/breadcrumbs/Breadcrumbs';
import {
  CalendarBreadcrumbs,
  CalendarsBreadcrumbs,
  CalendarSettingsBreadcrumbs,
  HomeBreadcrumbs,
} from '@ui/breadcrumbs/breadcrumbsLinks';
import { ErrorButton } from '@ui/button/ErrorButton';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { Card } from '@ui/card/Card';
import { CardContent } from '@ui/card/CardContent';
import { InputText } from '@ui/input/InputText';
import { Description } from '@ui/typography/Description';
import { Label } from '@ui/typography/Label';
import { Spacer } from '@ui/utils/Spacer';
import { useEffect, useState, VFC } from 'react';

import { User } from '@/types/User';

export const CalendarSettingsPage: VFC = () => {
  const {
    params: { calendarId = '' },
    push,
  } = useRouter();

  const { calendar, setQueryCalendarId } = useCalendarQuery();
  useEffect(() => {
    setQueryCalendarId(calendarId);
  }, [calendarId]);

  const breadcrumbs = [
    HomeBreadcrumbs(),
    CalendarsBreadcrumbs(),
    CalendarBreadcrumbs(calendar?.name, calendarId),
    CalendarSettingsBreadcrumbs(calendarId),
  ];

  const { editCalendar, deleteCalendar, entryAccept, entryReject } = useCalendarCommand();

  const [calendarName, setCalendarName] = useState('');
  useEffect(() => {
    if (calendar) {
      setCalendarName(calendar.name);
    }
  }, [calendar]);
  const onClickChangeCalendarNameButton = async () => {
    await editCalendar(calendarId, calendarName);
  };

  const { confirm } = useDeleteConfirmModal();
  const onClickDeleteButton = async () => {
    if (!calendar) {
      return;
    }
    const result = await confirm(calendar.name);
    if (result) {
      await deleteCalendar(calendar);
      push('/calendars');
    }
  };

  const entryUrl = `${window.location.origin}/calendars/${calendarId}/entry`;
  const copyEntryUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(entryUrl);
    }
  };
  const onClickEntryAccept = async (user: User) => {
    await entryAccept(calendarId, user.uid);
  };
  const onClickEntryReject = async (user: User) => {
    await entryReject(calendarId, user.uid);
  };

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Card sx={{ margin: 2 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Box sx={{ padding: 2 }}>
            <Label>カレンダー名変更</Label>
            <Divider sx={{ marginY: 1 }} />
            <InputText
              label={'新しいカレンダー名'}
              value={calendarName}
              onChange={(e) => setCalendarName(e.currentTarget.value)}
              sx={{ marginTop: 2 }}
              autoComplete={'off'}
            />
            <PrimaryButton onClick={onClickChangeCalendarNameButton} sx={{ marginTop: 2 }}>
              変更する
            </PrimaryButton>
          </Box>
          <Box sx={{ padding: 2 }}>
            <Label>カレンダー共有</Label>
            <Divider sx={{ marginY: 1 }} />
            <Alert
              severity="warning"
              sx={{ '> .MuiAlert-message': { display: 'flex', flexDirection: 'column' }, marginTop: 2 }}
            >
              <Description size={'sm'}>招待したいユーザーに以下URLを共有してください。</Description>
              <Description size={'sm'}>以下URLにアクセスすると参加リクエストが送られます。</Description>
            </Alert>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: 2 }}>
              <Link />
              <Label size={'sm'}>{entryUrl}</Label>
              <Tooltip title={'コピーする'} placement={'top'}>
                <IconButton onClick={copyEntryUrl}>
                  <ContentCopy />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box sx={{ padding: 2 }}>
            <Label>参加リクエスト</Label>
            <Divider sx={{ marginY: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 2 }}>
              {calendar?.entryUsers.map((e) => (
                <Box key={e.uid} sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 2, width: '60%' }}>
                  <UserAvatar user={e} />
                  <Label>{e.name}</Label>
                  <Spacer />
                  <PrimaryButton onClick={() => onClickEntryAccept(e)}>承認</PrimaryButton>
                  <ErrorButton onClick={() => onClickEntryReject(e)}>拒否</ErrorButton>
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ border: 'solid 2px', borderColor: 'error.main', borderRadius: '8px', padding: 2 }}>
            <Label>カレンダー削除</Label>
            <Divider sx={{ marginY: 1 }} />
            <ErrorButton sx={{ marginTop: 2 }} onClick={onClickDeleteButton}>
              カレンダーを削除する
            </ErrorButton>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
