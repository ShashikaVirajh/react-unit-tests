import { render, screen } from '@testing-library/react';
import { Image } from './image.component';
import userEvent from '@testing-library/user-event';

describe('Image component', () => {
  it('renders an image with the correct props', () => {
    const props = {
      src: 'https://example.com/image.jpg',
      height: '100',
      width: '200',
      alt: 'Example Image',
      onClick: jest.fn()
    };

    render(<Image {...props} />);
    const imageComponent = screen.getByRole('img');

    expect(imageComponent).toHaveAttribute('src', props.src);
    expect(imageComponent).toHaveAttribute('height', props.height.toString());
    expect(imageComponent).toHaveAttribute('width', props.width.toString());
    expect(imageComponent).toHaveAttribute('alt', props.alt);
  });

  it('calls the onClick when the image is clicked', () => {
    const props = {
      src: 'https://example.com/image.jpg',
      height: '100',
      width: '200',
      alt: 'Example Image',
      onClick: jest.fn()
    };

    render(<Image {...props} />);
    const imageComponent = screen.getByRole('img');

    userEvent.click(imageComponent);
    expect(props.onClick).toHaveBeenCalled();
  });
});
