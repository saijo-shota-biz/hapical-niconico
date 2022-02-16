import { useCalendarCommand } from '@hooks/domain/command/useCalendarCommand';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { useRouter } from '@hooks/util/useRouter';
import { Alert, Box } from '@mui/material';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { Description } from '@ui/typography/Description';
import { useEffect, useState, VFC } from 'react';

export const EntryPage: VFC = () => {
  const {
    params: { calendarId = '' },
    push,
  } = useRouter();
  const { loginUser } = useLoginUser();

  const [loading, setLoading] = useState(true);
  const { entry } = useCalendarCommand();
  useEffect(() => {
    if (loginUser) {
      entry(calendarId, loginUser.uid).then(() => {
        setLoading(false);
      });
    }
  }, [loginUser]);

  if (loading) {
    return null;
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
        <Alert severity={'success'}>
          <Description>参加リクエストを送信しました。</Description>
        </Alert>
        <PrimaryButton onClick={() => push('/')} sx={{ marginTop: 2 }}>
          ホーム画面へ
        </PrimaryButton>
      </Box>
    </>
  );
};
