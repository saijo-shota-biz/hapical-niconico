import { useCalendarCommand } from '@hooks/domain/command/useCalendarCommand';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { useRouter } from '@hooks/util/useRouter';
import { Alert, Box } from '@mui/material';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { Description } from '@ui/typography/Description';
import { Loading } from '@ui/utils/Loading';
import { useEffect, useState, VFC } from 'react';

export const EntryPage: VFC = () => {
  const {
    params: { calendarId = '' },
    push,
  } = useRouter();
  const { loginUser } = useLoginUser();

  const [status, setStatus] = useState<'success' | 'loading' | 'error'>('loading');
  const { entry } = useCalendarCommand();
  useEffect(() => {
    if (loginUser) {
      setStatus('loading');
      entry(calendarId, loginUser.uid)
        .then(() => setStatus('success'))
        .catch(() => setStatus('error'));
    }
  }, [loginUser]);

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {status === 'success' && (
          <Alert severity={'success'}>
            <Description>参加リクエストを送信しました。</Description>
          </Alert>
        )}
        {status === 'error' && (
          <Alert severity={'error'}>
            <Description>参加リクエストの送信に失敗しました。</Description>
          </Alert>
        )}
        <PrimaryButton onClick={() => push('/')} sx={{ marginTop: 2 }}>
          ホーム画面へ
        </PrimaryButton>
      </Box>
    </>
  );
};
