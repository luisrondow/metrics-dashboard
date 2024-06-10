import { render, screen } from '@testing-library/react';

import Header from './header.component';

describe('Header Component', () => {
  // add a snapshot test
  it('matches snapshot', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the header with correct text', () => {
    render(<Header />);
    const headerElement = screen.getByText('Metrics Dashboard');
    expect(headerElement).toBeInTheDocument();
  });

  it('renders the header element', () => {
    render(<Header />);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  it('renders the h1 element inside the header', () => {
    render(<Header />);
    const h1Element = screen.getByRole('heading', { level: 1 });
    expect(h1Element).toBeInTheDocument();
    expect(h1Element).toHaveTextContent('Metrics Dashboard');
  });
});
