import { useConfirmModal } from '@hooks/components/useConfirmModal';

export const useDeleteConfirmModal = () => {
  const { confirm } = useConfirmModal();
  const confirmDelete = (deleteTarget: string = '') => {
    return confirm({
      header: deleteTarget ? `${deleteTarget}を削除します` : '削除します',
      content: '本当によろしいですか？',
      action: {
        cancel: { color: 'neutral', label: 'キャンセル' },
        ok: { color: 'error', label: '削除' },
      },
    });
  };

  return { confirm: confirmDelete };
};
