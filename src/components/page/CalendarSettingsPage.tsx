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
import { useEffect, useState, VFC } from 'react';

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

  const { editCalendar, deleteCalendar } = useCalendarCommand();

  const [calendarName, setCalendarName] = useState('');
  useEffect(() => {
    if (calendar) {
      setCalendarName(calendar.name);
    }
  }, [calendar]);
  const onClickChangeCalendarNameButton = async () => {
    await editCalendar(calendarId, calendarName);
  };

  const [inviteIds, setInviteIds] = useState<string[]>([]);
  const onClickIssueInviteUrl = () => {
    setInviteIds((prev) => [...prev, `test${prev.length + 1}`]);
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

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
              />
              <PrimaryButton onClick={onClickChangeCalendarNameButton} sx={{ marginTop: 2 }}>
                変更する
              </PrimaryButton>
            </Box>
            <Box sx={{ padding: 2 }}>
              <Label>カレンダー共有</Label>
              <Divider sx={{ marginY: 1 }} />
              <Alert severity="warning" sx={{ marginTop: 2 }}>
                <Description size={'sm'}>
                  発行されたURLの有効期限は24時間です。また、1URLにつき1ユーザーの招待が可能です。
                </Description>
              </Alert>
              <PrimaryButton onClick={onClickIssueInviteUrl} sx={{ marginTop: 2 }}>
                共有URLを発行する
              </PrimaryButton>
              {inviteIds.map((inviteId) => (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: 2 }}>
                    <Link />
                    <Label size={'sm'}>{`${window.location.origin}/invites/${inviteId}`}</Label>
                    <Tooltip title={'コピーする'} placement={'top-start'}>
                      <IconButton>
                        <ContentCopy />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </>
              ))}
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
      </Box>
    </>
  );
};
