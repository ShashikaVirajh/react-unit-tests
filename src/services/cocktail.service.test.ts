import axios, { AxiosInstance } from 'axios';
import { CocktailService } from './cocktail.service';

// Mock axios and its response
jest.mock('axios');

describe('CocktailService', () => {
  describe('FetchRandomCocktails', () => {
    let axiosMock: jest.Mocked<AxiosInstance>;

    beforeEach(() => {
      // Here typescript can't guarantee the casting of axios to jest.Mocked<AxiosInstance>.
      // axios is an instance of 'AxiosStatic', which is different from 'AxiosInstance'.
      // Hence axios is cast to unknown first and then to jest.Mocked<AxiosInstance>.
      axiosMock = axios as unknown as jest.Mocked<AxiosInstance>;
    });

    it('should fetch random cocktails and return a list of cocktails', async () => {
      // Response returns from the API
      const mockAxiosResponse = {
        data: {
          drinks: [
            {
              idDrink: '1',
              strDrink: 'Mojito One',
              strCategory: 'Cocktail',
              strInstructions: 'A refreshing cocktail',
              strDrinkThumb: 'https://example.com/mojito-one.jpg'
            },
            {
              idDrink: '2',
              strDrink: 'Mojito Two',
              strCategory: 'Mocktail',
              strInstructions: 'A refreshing mocktail',
              strDrinkThumb: 'https://example.com/mojito-two.jpg'
            },
            {
              idDrink: '3',
              strDrink: 'Mojito Three',
              strCategory: 'Cocktail',
              strInstructions: 'Another refreshing cocktail',
              strDrinkThumb: 'https://example.com/mojito-three.jpg'
            }
          ]
        }
      };

      // normalized response using normalizeFetchRandomCocktailsResponse
      const normalizedMockAxiosResponse = [
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
          category: 'Mocktail',
          description: 'A refreshing mocktail',
          image: 'https://example.com/mojito-two.jpg'
        },
        {
          cocktailId: '3',
          cocktailName: 'Mojito Three',
          category: 'Cocktail',
          description: 'Another refreshing cocktail',
          image: 'https://example.com/mojito-three.jpg'
        }
      ];

      axiosMock.get.mockResolvedValue(mockAxiosResponse);
      const cocktailList = await CocktailService.FetchRandomCocktails();

      expect(cocktailList.length).toEqual(normalizedMockAxiosResponse.length);
    });

    it('should catch and return an error if fetching fails', async () => {
      const errorMessage = 'Error fetching cocktails';

      axiosMock.get.mockRejectedValue(new Error(errorMessage));
      const error = await CocktailService.FetchRandomCocktails();

      expect(error.message).toEqual(errorMessage);
    });
  });
});
