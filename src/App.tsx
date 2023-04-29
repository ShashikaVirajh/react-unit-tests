import { Grid, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { fetchCocktailList } from './store/cocktail/cocktail.reducer';
import { CocktailCard } from './components/cocktail-card/cocktail-card.component';

export const App: FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const cocktailList = useSelector((state: RootState) => state.cocktails.cocktailList);
  const loading = useSelector((state: RootState) => state.cocktails.loading);
  const error = useSelector((state: RootState) => state.cocktails.error);

  useEffect(() => {
    dispatch(fetchCocktailList());
  }, [dispatch]);

  if (loading) {
    return (
      <Typography textAlign='center' mt='20rem' color='blue'>
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography textAlign='center' mt='20rem' color='red'>
        ERROR: {error}
      </Typography>
    );
  }

  return (
    <Grid container justifyContent='center' spacing={'1rem'}>
      {cocktailList.map((cocktail, index) => (
        <Grid key={index} item xs={2}>
          <CocktailCard key={cocktail.cocktailId} cocktailInfo={cocktail} />
        </Grid>
      ))}
    </Grid>
  );
};
