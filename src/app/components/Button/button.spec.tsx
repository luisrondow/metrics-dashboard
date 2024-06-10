import { render, screen, fireEvent } from '@testing-library/react';
import Button from './button.component';

describe('Button Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Button onClick={() => {}}>Click me</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders button with children', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByText('Click me');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
