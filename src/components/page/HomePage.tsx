import { useAuth } from '@hooks/util/useAuth';
import { useDeleteConfirmModal } from '@hooks/util/useDeleteConfirmModal';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { Box, Link, Stack } from '@mui/material';
import { AppButton } from '@ui/button/AppButton';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { Description } from '@ui/typography/Description';
import { Label } from '@ui/typography/Label';
import { VFC } from 'react';

export const HomePage: VFC = () => {
  const { signOut } = useAuth();
  const { loginUser } = useLoginUser();

  const { confirm } = useDeleteConfirmModal();

  const onClickOpenModalButton = async () => {
    const result = await confirm('テスト');
    console.log(result);
  };

  return (
    <Stack spacing={3}>
      <Label>ホームページ</Label>
      <Stack spacing={2}>
        <Label>ログインユーザー</Label>
        <div>{JSON.stringify(loginUser)}</div>
      </Stack>
      <Stack spacing={2}>
        <Label>リンク</Label>
        <Link href={'/team-list'}>チーム一覧</Link>
      </Stack>
      <Stack spacing={2}>
        <Label>サンドボックス</Label>
        <Stack spacing={1}>
          <Description>確認モーダル</Description>
          <AppButton onClick={onClickOpenModalButton}>開く</AppButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
