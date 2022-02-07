import { atom, useRecoilState } from 'recoil';

import { Emotion } from '@/types/Calendar';

type ReportAddModalStateType = {
  open: boolean;
  onClickOk: (report: ReportState) => void;
  onClickCancel: () => void;
};

type ReportState = {
  uid?: string;
  date: string;
  emotion: Emotion;
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

const ReportAddModalDateState = atom<Date>({
  key: 'StateReportAddModalDate',
  default: new Date(),
});

export const useReportAddModal = () => {
  const [state, setState] = useRecoilState(ReportAddModalState);
  const [date, setDate] = useRecoilState(ReportAddModalDateState);

  const showReportAddModal = (date: Date = new Date()): Promise<ReportState | null> => {
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

  return { ...state, date, showReportAddModal, closeReportAddModal };
};
