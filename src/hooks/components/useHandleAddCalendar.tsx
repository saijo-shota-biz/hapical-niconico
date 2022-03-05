import { useCalendarAddModal } from '@hooks/components/useCalendarAddModal';
import { useCalendarCommand } from '@hooks/domain/command/useCalendarCommand';
import { useHandler } from '@hooks/util/useHandler';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { useEffect } from 'react';

export const useHandleAddCalendar = () => {
  const { loginUser } = useLoginUser();

  const { handleAsyncEvent } = useHandler();
  const { showCalendarAddModal, closeCalendarAddModal } = useCalendarAddModal();
  const { createCalendar } = useCalendarCommand();

  useEffect(() => {
    return () => closeCalendarAddModal();
  }, []);

  return handleAsyncEvent(async () => {
    const result = await showCalendarAddModal();
    if (result && loginUser) {
      await createCalendar(loginUser, result.name, result.shared);
      closeCalendarAddModal();
    }
  });
};
