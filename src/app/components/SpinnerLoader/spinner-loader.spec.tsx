import { render, screen } from '@testing-library/react';

import SpinnerLoader from './spinner-loader.component';

jest.mock('./spinner-loader.styles', () => {
  const Spinner = () => <div data-testid="spinner"></div>;

  return { Spinner };
});

describe('SpinnerLoader Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<SpinnerLoader />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders spinner correctly', () => {
    render(<SpinnerLoader />);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });
});
