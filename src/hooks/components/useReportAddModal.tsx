import { atom, useRecoilState } from 'recoil';

import { Emotion } from '@/types/Calendar';

type ReportAddModalStateType = {
  open: boolean;
  onClickOk: (report: ReportState) => void;
  onClickCancel: () => void;
};

type ReportState = {
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

export const useReportAddModal = () => {
  const [state, setState] = useRecoilState(ReportAddModalState);

  const showReportAddModal = (): Promise<ReportState | null> => {
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

  return { ...state, showReportAddModal, closeReportAddModal };
};
