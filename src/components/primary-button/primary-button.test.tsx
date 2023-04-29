import { render, screen } from '@testing-library/react';
import { PrimaryButton } from './primary-button.component';
import userEvent from '@testing-library/user-event';

describe('PrimaryButton', () => {
  it('renders primary button with the correct text', () => {
    const text = 'Submit';
    render(<PrimaryButton text={text} />);

    const button = screen.getByRole('button', { name: text });
    expect(button).toBeInTheDocument();
  });

  it('disables the button when the disabled is true', () => {
    const text = 'Submit';
    const onClick = jest.fn();
    render(<PrimaryButton text={text} onClick={onClick} disabled />);

    // Here getByText will not work.
    // The reason is when we use getByText it returns the Typograpy. Not the Button.
    const button = screen.getByRole('button', { name: text });
    expect(button).toBeDisabled();
  });

  it('calls onClick when the button is not disabled and clicked', () => {
    const text = 'Submit';
    const onClick = jest.fn();
    render(<PrimaryButton text={text} onClick={onClick} />);

    const button = screen.getByRole('button', { name: text });
    userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('shows the loader when the isLoading is true', () => {
    const text = 'Submit';
    render(<PrimaryButton text={text} isLoading />);

    const button = screen.queryByRole('button', { name: text });
    expect(button).not.toBeInTheDocument();

    const circularProgress = screen.getByRole('progressbar');
    expect(circularProgress).toBeInTheDocument();
  });
});
