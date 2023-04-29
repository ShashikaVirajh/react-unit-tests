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
          cocktailName: 'Mojito One',
          category: 'Cocktail',
          description: 'A refreshing cocktail',
          image: 'https://example.com/mojito-one.jpg'
        },
        {
          cocktailId: '2',
          cocktailName: 'Mojito Two',
          category: 'Cocktail',
          description: 'A very good cocktail',
          image: 'https://example.com/mojito-two.jpg'
        }
      ];

      // Mocking `FetchRandomCocktails` that always resolves the `mockResponse`.
      // This is done to isolate the test case from external dependencies.
      (CocktailService.FetchRandomCocktails as jest.Mock).mockResolvedValue(mockResponse);

      // Dispatching `fetchCocktailList` redux action.
      await store.dispatch(fetchCocktailList());

      // Get all the actions dispatched to the store during `fetchCocktailList` call.
      // This includes actions dispatched by redux-thunk.
      // actions[0] = fetchCocktailList.pending
      // actions[1] = fetchCocktailList.fulfilled
      const actions = store.getActions();

      expect(actions[0].type).toEqual(fetchCocktailList.pending.type);
      expect(actions[1].type).toEqual(fetchCocktailList.fulfilled.type);
      expect(actions[1].payload).toEqual(mockResponse);
    });

    it('should handle fetch cocktail list error', async () => {
      const errorMessage = 'Failed to fetch cocktail list';

      // Mocking `FetchRandomCocktails` that always resolves the `mockResponse`.
      // This is done to isolate the test case from external dependencies.
      (CocktailService.FetchRandomCocktails as jest.Mock).mockRejectedValue(errorMessage);

      // Dispatching `fetchCocktailList` redux action.
      await store.dispatch(fetchCocktailList());

      // Dispatching `fetchCocktailList` redux action.
      // actions[0] = fetchCocktailList.pending
      // actions[1] = fetchCocktailList.rejected
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
          cocktailName: 'Mojito One',
          category: 'Cocktail',
          description: 'A refreshing cocktail',
          image: 'https://example.com/mojito-one.jpg'
        },
        {
          cocktailId: '2',
          cocktailName: 'Mojito Two',
          category: 'Cocktail',
          description: 'A very good cocktail',
          image: 'https://example.com/mojito-two.jpg'
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
