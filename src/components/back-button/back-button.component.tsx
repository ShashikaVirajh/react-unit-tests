import LeftArrow from '@mui/icons-material/ArrowBack';
import { Box, Typography } from '@mui/material';
import { FC } from 'react';

export const BackButton: FC<Props> = ({ text, style, onClick }) => {
  return (
    <Box sx={{ display: 'flex', ...style }} onClick={onClick}>
      <LeftArrow sx={{ marginTop: '0.3rem' }} color='primary' />

      <Typography
        variant='body1'
        sx={{
          fontFamily: 'Hellix-SemiBold',
          cursor: 'pointer',
          marginTop: '0.3rem',
          marginLeft: '0.2rem'
        }}
        color='#3152F5'
      >
        {text}
      </Typography>
    </Box>
  );
};

type Props = {
  text: string;
  style?: any;
  onClick?: () => void;
};
