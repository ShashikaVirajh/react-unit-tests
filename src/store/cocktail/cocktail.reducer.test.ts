import { AppDispatch } from './../store';
import { cocktailsSlice, fetchCocktailList } from './cocktail.reducer';
import { CocktailService } from '../../services/cocktail.service';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

type MockStore = MockStoreEnhanced<unknown, AppDispatch>;

// Create a Jest mock function for the CocktailService.FetchRandomCocktails method
jest.mock('../../services/cocktail.service', () => ({
  CocktailService: {
    FetchRandomCocktails: jest.fn()
  }
}));

describe('cocktailsSlice', () => {
  let store: MockStore;

  beforeEach(() => {
    store = mockStore({
      cocktails: {
        cocktailList: [],
        loading: false,
        error: null
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchCocktailList', () => {
    it('should fetch cocktail list successfully', async () => {
      const mockResponse = [
        {
          cocktailId: '1',
          cocktailName: 'Mojito',
          category: 'Cocktail',
          description: 'A refreshing cocktail',
          image: 'https://example.com/mojito.jpg'
        }
      ];

      (CocktailService.FetchRandomCocktails as jest.Mock).mockResolvedValue(mockResponse);

      await store.dispatch(fetchCocktailList());

      const actions = store.getActions();

      expect(actions[0].type).toEqual(fetchCocktailList.pending.type);
      expect(actions[1].type).toEqual(fetchCocktailList.fulfilled.type);
      expect(actions[1].payload).toEqual(mockResponse);
    });

    it('should handle fetch cocktail list error', async () => {
      const errorMessage = 'Failed to fetch cocktail list';

      (CocktailService.FetchRandomCocktails as jest.Mock).mockRejectedValue(errorMessage);

      await store.dispatch(fetchCocktailList());

      const actions = store.getActions();

      expect(actions[0].type).toEqual(fetchCocktailList.pending.type);
      expect(actions[1].type).toEqual(fetchCocktailList.rejected.type);
      expect(actions[1].error.message).toEqual(errorMessage);
    });
  });

  describe('reducers', () => {
    it('should handle fetchCocktailList.pending', () => {
      const newState = cocktailsSlice.reducer(undefined, { type: fetchCocktailList.pending.type });
      expect(newState.loading).toEqual(true);
      expect(newState.error).toEqual(null);
    });

    it('should handle fetchCocktailList.fulfilled', () => {
      const mockPayload = [
        {
          cocktailId: '1',
          cocktailName: 'Mojito',
          category: 'Cocktail',
          description: 'A refreshing cocktail',
          image: 'https://example.com/mojito.jpg'
        }
      ];

      const newState = cocktailsSlice.reducer(undefined, {
        type: fetchCocktailList.fulfilled.type,
        payload: mockPayload
      });
      expect(newState.loading).toEqual(false);
      expect(newState.error).toEqual(null);
      expect(newState.cocktailList).toEqual(mockPayload);
    });

    it('should handle fetchCocktailList.rejected', () => {
      const mockError = { message: 'Failed to fetch cocktail list' };

      const newState = cocktailsSlice.reducer(undefined, {
        type: fetchCocktailList.rejected.type,
        error: mockError
      });
      expect(newState.loading).toEqual(false);
      expect(newState.error).toEqual(mockError.message);
    });
  });
});
