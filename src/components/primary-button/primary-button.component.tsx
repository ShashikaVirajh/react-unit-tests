import { Button as MUIButton, CircularProgress, Typography } from '@mui/material';
import { FC } from 'react';

export const PrimaryButton: FC<Props> = ({
  text,
  onClick,
  style,
  isLoading = false,
  disabled = false,
  type = 'submit'
}) => {
  return (
    <MUIButton
      variant='contained'
      disableElevation
      size='large'
      type={type}
      color='primary'
      onClick={onClick}
      disabled={disabled}
      sx={{
        height: '3rem',
        lineHeight: '2.625rem',
        paddingX: '3.125rem',
        width: '16rem',
        ...style
      }}
    >
      {isLoading ? (
        <CircularProgress size={30} sx={{ color: 'white' }} />
      ) : (
        <Typography variant='button'>{text}</Typography>
      )}
    </MUIButton>
  );
};

type Props = {
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
  style?: any;
  onClick?: () => void;
};
