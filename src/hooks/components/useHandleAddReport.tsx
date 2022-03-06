import { useReportAddModal } from '@hooks/components/useReportAddModal';
import { useCalendarCommand } from '@hooks/domain/command/useCalendarCommand';
import { useCurrentCalendarId } from '@hooks/domain/query/useCurrentCalendarId';
import { useHandler } from '@hooks/util/useHandler';
import { useLoginUser } from '@hooks/util/useLoginUser';
import { RequireOne } from '@utils/type';
import { useEffect } from 'react';

export const useHandleAddReport = () => {
  const { loginUser } = useLoginUser();
  const { handleAsyncEvent } = useHandler();

  const { showReportAddModal, closeReportAddModal } = useReportAddModal();

  const { addReport } = useCalendarCommand();

  const { calendarId } = useCurrentCalendarId();

  useEffect(() => {
    return () => closeReportAddModal();
  }, []);

  return handleAsyncEvent(async (args: RequireOne<{ reportId?: string; date?: Date }>) => {
    const result = await showReportAddModal(args);
    if (result) {
      await addReport({
        uid: result.uid,
        calendarId: calendarId,
        userId: loginUser?.uid || '',
        date: result.date,
        emotion: result.emotion,
        comment: result.comment,
      });
      closeReportAddModal();
    }
  });
};
