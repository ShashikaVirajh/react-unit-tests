import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

import { FC } from 'react';
import { TCocktail } from '../../store/cocktail/cocktail.reducer';

type Props = {
  cocktailInfo: TCocktail;
};

export const CocktailCard: FC<Props> = ({ cocktailInfo }): JSX.Element => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 300,
        height: 400,
        border: '2px solid #3152F5',
        borderRadius: '0.4rem'
      }}
    >
      <CardActionArea>
        <CardMedia
          component='img'
          sx={{ height: 160 }}
          src={cocktailInfo.image}
          alt='cocktail-image'
        />

        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {cocktailInfo.cocktailName}
          </Typography>

          <Typography mt='-0.5rem' gutterBottom variant='caption' component='div'>
            Category: {cocktailInfo.category}
          </Typography>

          <Typography variant='body2' color='text.secondary'>
            {cocktailInfo.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
