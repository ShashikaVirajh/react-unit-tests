import { CardMedia } from '@mui/material';
import { FC } from 'react';

export const Image: FC<Props> = ({ src, height, width, alt, style, onClick }): JSX.Element => {
  return (
    <CardMedia
      component='img'
      height={height}
      width={width}
      src={src}
      alt={alt}
      onClick={onClick}
    />
  );
};

type Props = {
  src: string;
  height: number | string;
  width?: number | string;
  alt?: string;
  style?: any;
  onClick?: () => void;
};
