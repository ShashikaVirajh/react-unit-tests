import { render, screen } from '@testing-library/react';
import { BackButton } from './back-button.component';
import userEvent from '@testing-library/user-event';

describe('BackButton', () => {
  it('renders back button with the correct text', () => {
    const text = 'Go back';
    render(<BackButton text={text} />);

    const button = screen.getByText(text);
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const text = 'Go back';
    const onClick = jest.fn();
    render(<BackButton text={text} onClick={onClick} />);

    const button = screen.getByText(text);
    userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
