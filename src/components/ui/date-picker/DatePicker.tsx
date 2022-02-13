import { useCalendar } from '@hooks/components/useCalendar';
import { useDate } from '@hooks/util/useDate';
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import { Badge, Box, IconButton } from '@mui/material';
import { PrimaryButton } from '@ui/button/PrimaryButton';
import { InputText } from '@ui/input/InputText';
import { Label } from '@ui/typography/Label';
import { Spacer } from '@ui/utils/Spacer';
import { useEffect, useState, VFC } from 'react';

type Props = {
  startDate: Date;
  onChangeStartDate: (date: Date) => void;
  endDate: Date;
  onChangeEndDate: (date: Date) => void;
};

export const DatePicker: VFC<Props> = ({ startDate, onChangeStartDate, endDate, onChangeEndDate }) => {
  const {
    formatYm,
    formatYmd,
    formatMd,
    prevMonth,
    nextMonth,
    isToday,
    isThisMonth,
    getRangeWeek,
    getRangeYear,
    getRangeMonth,
  } = useDate();
  const [baseDate, setBaseDate] = useState(new Date());
  const { dateList, dayList, getDayColor, getThisMonthColor } = useCalendar(baseDate);

  const [selectedDateInput, setSelectedDateInput] = useState<'start' | 'end'>('start');

  const onClickDateElem = (date: Date) => {
    if (selectedDateInput === 'start') {
      onChangeStartDate(date);
      setSelectedDateInput('end');
    }
    if (selectedDateInput === 'end') {
      onChangeEndDate(date);
      setSelectedDateInput('start');
    }
  };

  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      onChangeEndDate(startDate);
      onChangeStartDate(endDate);
    }
  }, [startDate, endDate]);

  const dateElemBackgroundColor = (date: Date) => {
    if (formatYmd(date) === formatYmd(startDate) || formatYmd(date) === formatYmd(endDate)) {
      return 'primary.200';
    }
    if (formatYmd(startDate) < formatYmd(date) && formatYmd(date) < formatYmd(endDate)) {
      return 'primary.50';
    }
    return 'common.white';
  };

  const onClickYearButton = () => {
    const today = new Date();
    const { start, end } = getRangeYear(today.getFullYear());
    onChangeStartDate(start);
    onChangeEndDate(end);
  };

  const onClickMonthButton = () => {
    const today = new Date();
    const { start, end } = getRangeMonth(today.getFullYear(), today.getMonth());
    onChangeStartDate(start);
    onChangeEndDate(end);
  };

  const onClickWeekButton = () => {
    const today = new Date();
    const { start, end } = getRangeWeek(today.getFullYear(), today.getMonth(), today.getDate());
    onChangeStartDate(start);
    onChangeEndDate(end);
  };

  return (
    <Box sx={{ width: '314px', height: '458px', border: 'solid 1px', borderColor: 'grey.200', padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        <PrimaryButton size={'small'} onClick={onClickYearButton}>
          今年
        </PrimaryButton>
        <PrimaryButton size={'small'} onClick={onClickMonthButton}>
          今月
        </PrimaryButton>
        <PrimaryButton size={'small'} onClick={onClickWeekButton}>
          今週
        </PrimaryButton>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, marginY: 2 }}>
        <InputText
          size={'small'}
          onClick={() => setSelectedDateInput('start')}
          value={formatYmd(startDate)}
          focused={selectedDateInput === 'start'}
          autoComplete={'off'}
        />
        <InputText
          size={'small'}
          onClick={() => setSelectedDateInput('end')}
          value={formatYmd(endDate)}
          focused={selectedDateInput === 'end'}
          autoComplete={'off'}
        />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <IconButton onClick={() => setBaseDate((prev) => prevMonth(prev))}>
            <ArrowBackIosNewOutlined />
          </IconButton>
          <Spacer />
          <Label size={'lg'}>{formatYm(baseDate)}</Label>
          <Spacer />
          <IconButton disabled={isThisMonth(baseDate)} onClick={() => setBaseDate((prev) => nextMonth(prev))}>
            <ArrowForwardIosOutlined />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        {dayList.map((e, i) => (
          <Box
            key={e}
            sx={{
              height: '40px',
              width: '40px',
              padding: 1,
            }}
          >
            <Label
              sx={{
                ...getDayColor(i),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {e}
            </Label>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {dateList.map((date) => (
          <Box
            key={formatYmd(date)}
            sx={{
              padding: 1,
              height: '40px',
              width: '40px',
              backgroundColor: dateElemBackgroundColor(date),
              cursor: 'pointer',
              ':hover': {
                backgroundColor: 'primary.main',
                ' #dateLabel': {
                  color: 'common.white',
                },
              },
            }}
            onClick={() => onClickDateElem(date)}
          >
            <Badge
              color="primary"
              variant="dot"
              invisible={!isToday(date)}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '24px',
                height: '24px',
              }}
            >
              <Label
                id={'dateLabel'}
                sx={{
                  ...getDayColor(date.getDay()),
                  ...getThisMonthColor(date),
                }}
              >
                {date.getDate() === 1 ? formatMd(date) : date.getDate()}
              </Label>
            </Badge>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
