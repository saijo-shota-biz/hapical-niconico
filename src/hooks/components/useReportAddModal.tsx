import { RequireOne } from '@utils/type';
import { atom, useRecoilState } from 'recoil';

import { Emotion } from '@/types/Calendar';

type ReportAddModalStateType = {
  open: boolean;
  onClickOk: (report: ReportState) => void;
  onClickCancel: () => void;
};

type ReportState = {
  uid?: string;
  emotion: Emotion;
  date?: Date;
  comment: string;
};

const ReportAddModalState = atom<ReportAddModalStateType>({
  key: 'StateReportAddModal',
  default: {
    open: false,
    onClickOk: () => {},
    onClickCancel: () => {},
  },
});

const ReportAddModalReportIdState = atom<string | undefined>({
  key: 'StateReportAddModalReportId',
  default: undefined,
});

const ReportAddModalDateState = atom<Date | undefined>({
  key: 'StateReportAddModalDate',
  default: undefined,
});

export const useReportAddModal = () => {
  const [state, setState] = useRecoilState(ReportAddModalState);
  const [reportId, setReportId] = useRecoilState(ReportAddModalReportIdState);
  const [date, setDate] = useRecoilState(ReportAddModalDateState);

  const showReportAddModal = ({
    reportId,
    date,
  }: RequireOne<{ reportId?: string; date?: Date }>): Promise<ReportState | null> => {
    setReportId(reportId);
    setDate(date);
    return new Promise((resolve) => {
      setState((prev) => ({
        ...prev,
        open: true,
        onClickOk: (report) => {
          resolve(report);
        },
        onClickCancel: () => {
          closeReportAddModal();
          resolve(null);
        },
      }));
    });
  };

  const closeReportAddModal = () => {
    setState({
      open: false,
      onClickOk: () => {},
      onClickCancel: () => {},
    });
  };

  return { ...state, reportId, date, showReportAddModal, closeReportAddModal };
};
