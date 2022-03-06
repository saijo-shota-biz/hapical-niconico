import { useDate } from '@hooks/util/useDate';
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Label } from '@ui/typography/Label';
import { Dispatch, SetStateAction, VFC } from 'react';

type Props = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
};

export const InputMonth: VFC<Props> = ({ date, setDate }) => {
  const { prevMonth, formatYm, nextMonth, isThisMonth } = useDate();

  return (
    <>
      <IconButton onClick={() => setDate((prev) => prevMonth(prev))}>
        <ArrowBackIosNewOutlined />
      </IconButton>
      <Label size={'lg'} sx={{ minWidth: '68px' }}>
        {formatYm(date)}
      </Label>
      <IconButton disabled={isThisMonth(date)} onClick={() => setDate((prev) => nextMonth(prev))}>
        <ArrowForwardIosOutlined />
      </IconButton>
    </>
  );
};
