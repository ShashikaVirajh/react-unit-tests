import axios, { AxiosInstance } from 'axios';
import { CocktailService } from './cocktail.service';
import { normalizeFetchRandomCocktailsResponse } from '../normalizers/cocktail.normalizer';

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

    // it('should fetch random cocktails and return a list of cocktails', async () => {
    // const mockAxiosResponse = {
    //   data: [
    //     {
    //       cocktailId: '1',
    //       cocktailName: 'Mojito One',
    //       category: 'Cocktail',
    //       description: 'A refreshing cocktail',
    //       image: 'https://example.com/mojito-one.jpg'
    //     },
    //     {
    //       cocktailId: '2',
    //       cocktailName: 'Mojito Two',
    //       category: 'Cocktail',
    //       description: 'A very good cocktail',
    //       image: 'https://example.com/mojito-two.jpg'
    //     }
    //   ]
    // };

    //   axiosMock.get.mockResolvedValue(mockAxiosResponse);

    //   const cocktailList = await CocktailService.FetchRandomCocktails();
    //   expect(cocktailList.length).toEqual(mockAxiosResponse.data.length);
    // });

    it('should catch and return an error if fetching fails', async () => {
      const errorMessage = 'Error fetching cocktails';
      axiosMock.get.mockRejectedValue(new Error(errorMessage));

      const error = await CocktailService.FetchRandomCocktails();
      expect(error.message).toEqual(errorMessage);
    });
  });
});
