import { render, screen } from '@testing-library/react';
import { CocktailCard } from './cocktail-card.component';
import { TCocktail } from '../../store/cocktail/cocktail.reducer';

const cocktailInfo: TCocktail = {
  cocktailId: '1001',
  cocktailName: 'Black current mojito',
  category: 'Classic',
  description: 'With fresh black current juice and ice',
  image: 'https://backcurrent-mojito.jpg'
};

describe('CocktailCard', () => {
  it('renders the cocktail id, name, category, and description', () => {
    render(<CocktailCard cocktailInfo={cocktailInfo} />);

    const cocktailName = screen.getByText('Black current mojito');
    const cocktailCategory = screen.getByText('Category: Classic');
    const cocktailDescription = screen.getByText('With fresh black current juice and ice');

    expect(cocktailName).toBeInTheDocument();
    expect(cocktailCategory).toBeInTheDocument();
    expect(cocktailDescription).toBeInTheDocument();
  });

  it('renders the cocktail image', () => {
    render(<CocktailCard cocktailInfo={cocktailInfo} />);

    const cocktailImage = screen.getByAltText('cocktail-image');
    expect(cocktailImage).toHaveAttribute('src', 'https://backcurrent-mojito.jpg');
  });
});
