import { Box } from '@mui/material';
import { Description } from '@ui/typography/Description';
import { VFC } from 'react';

export const ReportListEmpty: VFC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignCenter: 'center',
        width: '100%',
        border: 'solid 1px',
        borderColor: 'grey.200',
        height: '458px',
        padding: 2,
      }}
    >
      <Description align={'center'} color={'grey.700'}>
        記録がありません。
      </Description>
      <Description align={'center'} color={'grey.700'}>
        右下の
        <Box
          sx={{
            display: 'inline-block',
            width: '24px',
            height: '24px',
            color: 'common.white',
            backgroundColor: 'primary.main',
            borderRadius: '50%',
          }}
        >
          +
        </Box>
        ボタンから初めての記録を残しましょう。
      </Description>
    </Box>
  );
};
