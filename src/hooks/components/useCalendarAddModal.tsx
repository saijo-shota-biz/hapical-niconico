import { atom, useRecoilState } from 'recoil';

type CalendarAddModalStateType = {
  open: boolean;
  onClickOk: (calendar: CalendarState) => void;
  onClickCancel: () => void;
};

type CalendarState = {
  name: string;
};

const ReportAddModalState = atom<CalendarAddModalStateType>({
  key: 'StateReportAddModal',
  default: {
    open: false,
    onClickOk: () => {},
    onClickCancel: () => {},
  },
});

export const useCalendarAddModal = () => {
  const [state, setState] = useRecoilState(ReportAddModalState);

  const showCalendarAddModal = (): Promise<CalendarState | null> => {
    return new Promise((resolve) => {
      setState((prev) => ({
        ...prev,
        open: true,
        onClickOk: (report) => {
          resolve(report);
        },
        onClickCancel: () => {
          closeCalendarAddModal();
          resolve(null);
        },
      }));
    });
  };

  const closeCalendarAddModal = () => {
    setState({
      open: false,
      onClickOk: () => {},
      onClickCancel: () => {},
    });
  };

  return { ...state, showCalendarAddModal, closeCalendarAddModal };
};
