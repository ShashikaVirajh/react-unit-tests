import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CocktailService } from '../../services/cocktail.service';

export type TCocktailState = {
  cocktailList: TCocktail[] | [];
  loading: boolean;
  error: string | null;
};

export type TCocktail = {
  cocktailId: string;
  cocktailName: string;
  category: string;
  description: string;
  image: string;
};

const INITIAL_STATE: TCocktailState = {
  cocktailList: [],
  loading: false,
  error: null
};

export const fetchCocktailList = createAsyncThunk('cocktail/fetchCocktailRequest', async () => {
  const response = await CocktailService.FetchRandomCocktails();
  return response;
});

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktailList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCocktailList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cocktailList = action.payload;
      })
      .addCase(fetchCocktailList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  }
});

export const cocktailReducer = cocktailsSlice.reducer;
