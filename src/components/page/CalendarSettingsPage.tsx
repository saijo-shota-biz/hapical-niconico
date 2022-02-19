import { UserAvatar } from '@domain/UserAvatar';
import { useDeleteConfirmModal } from '@hooks/components/useDeleteConfirmModal';
import { useToaster } from '@hooks/components/useToaster';
import { useValidationForm } from '@hooks/components/useValidationForm';
import { useCalendarCommand } from '@hooks/domain/command/useCalendarCommand';
import { useCalendarQuery } from '@hooks/domain/query/useCalendarQuery';
import { useHandler } from '@hooks/util/useHandler';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { useRouter } from '@hooks/util/useRouter';
import { Alert, Box, Divider } from '@mui/material';
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
import { useEffect, VFC } from 'react';
import { object, string } from 'yup';

import { User } from '@/types/User';

type CalendarNameForm = {
  calendarName: string;
};

export const CalendarSettingsPage: VFC = () => {
  const {
    params: { calendarId = '' },
    push,
  } = useRouter();
  const { loginUser } = useLoginUser();

  const { calendar } = useCalendarQuery();

  const breadcrumbs = [
    HomeBreadcrumbs(),
    CalendarsBreadcrumbs(),
    CalendarBreadcrumbs(calendarId, calendar?.name),
    CalendarSettingsBreadcrumbs(calendarId, 'current'),
  ];

  const { handleAsyncEvent } = useHandler();

  const { editCalendar, deleteCalendar, entryAccept, entryReject, deleteUser } = useCalendarCommand();

  const { register, handleSubmit, setValue } = useValidationForm<CalendarNameForm>(
    object({
      calendarName: string() //
        .required('カレンダー名を入力してください。'),
    })
  );
  useEffect(() => {
    if (calendar) {
      setValue('calendarName', calendar.name);
    }
  }, [calendar]);
  const onClickChangeCalendarNameButton = handleAsyncEvent(async ({ calendarName }: CalendarNameForm) => {
    await editCalendar(calendarId, calendarName);
  });

  const { confirm } = useDeleteConfirmModal();
  const onClickDeleteButton = handleAsyncEvent(async () => {
    if (!calendar) {
      return;
    }
    const result = await confirm(calendar.name);
    if (result) {
      await deleteCalendar(calendar);
      push('/calendars');
    }
  });

  const entryUrl = `${window.location.origin}/calendars/${calendarId}/entry`;
  const { showSuccessToast } = useToaster();
  const copyEntryUrl = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(entryUrl);
      showSuccessToast('共有URLをコピーしました。');
    }
  };
  const onClickEntryAccept = handleAsyncEvent(async (user: User) => {
    await entryAccept(calendarId, user.uid);
  });
  const onClickEntryReject = handleAsyncEvent(async (user: User) => {
    await entryReject(calendarId, user.uid);
  });

  const onClickDeleteUserButton = handleAsyncEvent(async (user: User) => {
    const result = await confirm(user.name);
    if (result) {
      await deleteUser(calendarId, user);
    }
  });

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Card sx={{ margin: 2 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Box sx={{ padding: 2 }}>
            <Label>カレンダー名変更</Label>
            <Divider sx={{ marginY: 1 }} />
            <InputText label={'新しいカレンダー名'} {...register('calendarName')} sx={{ marginTop: 2 }} />
            <PrimaryButton onClick={handleSubmit(onClickChangeCalendarNameButton)} sx={{ marginTop: 2 }}>
              変更する
            </PrimaryButton>
          </Box>
          <Box sx={{ padding: 2 }}>
            <Label>参加メンバー</Label>
            <Divider sx={{ marginY: 1 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, marginTop: 2 }}>
              {calendar &&
                [...calendar.users, ...calendar.entryUsers].map((e) => (
                  <Box key={e.uid} sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 2, width: '60%' }}>
                    <UserAvatar user={e} />
                    <Label>{e.name}</Label>
                    <Spacer />
                    {e.uid !== loginUser?.uid && (
                      <ErrorButton onClick={() => onClickDeleteUserButton(e)}>削除する</ErrorButton>
                    )}
                  </Box>
                ))}
            </Box>
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
              <PrimaryButton onClick={copyEntryUrl}>共有URLをコピーする</PrimaryButton>
            </Box>
          </Box>
          {calendar && calendar.entryUsers.length > 0 && (
            <Box sx={{ padding: 2 }}>
              <Label>参加リクエスト</Label>
              <Divider sx={{ marginY: 1 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, marginTop: 2 }}>
                {calendar?.entryUsers.map((e) => (
                  <Box key={e.uid} sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 2, width: '60%' }}>
                    <UserAvatar user={e} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <Label>{e.name}</Label>
                      <Label size={'sm'} color={'grey.700'}>
                        {e.email}
                      </Label>
                    </Box>
                    <Spacer />
                    <PrimaryButton onClick={() => onClickEntryAccept(e)}>承認</PrimaryButton>
                    <ErrorButton onClick={() => onClickEntryReject(e)}>拒否</ErrorButton>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
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
