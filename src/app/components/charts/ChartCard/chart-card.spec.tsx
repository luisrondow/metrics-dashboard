import { render, screen } from '@testing-library/react';
import ChartWrapper from './chart-card.component';

jest.mock('../../SpinnerLoader', () => ({
  __esModule: true,
  default: () => <div data-testid="spinner-loader">Loading...</div>,
}));

jest.mock('./chart-card.styles', () => ({
  Content: ({ children }: { children: React.ReactNode }) => <div data-testid="content">{children}</div>,
  Header: ({ children }: { children: React.ReactNode }) => <div data-testid="header">{children}</div>,
  Title: ({ children }: { children: React.ReactNode }) => <h1 data-testid="title">{children}</h1>,
  Wrapper: ({ children }: { children: React.ReactNode }) => <div data-testid="wrapper">{children}</div>,
}));

describe('ChartWrapper Component', () => {
  it('renders the title correctly', () => {
    render(<ChartWrapper title="Test Title">Chart Content</ChartWrapper>);
    const titleElement = screen.getByTestId('title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Test Title');
  });

  it('renders children when not loading', () => {
    render(<ChartWrapper title="Test Title">Chart Content</ChartWrapper>);
    const contentElement = screen.getByTestId('content');
    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toHaveTextContent('Chart Content');
  });

  it('renders SpinnerLoader when loading', () => {
    render(
      <ChartWrapper title="Test Title" isLoading={true}>
        Chart Content
      </ChartWrapper>,
    );
    const spinnerElement = screen.getByTestId('spinner-loader');
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveTextContent('Loading...');
  });

  it('does not render SpinnerLoader when not loading', () => {
    render(
      <ChartWrapper title="Test Title" isLoading={false}>
        Chart Content
      </ChartWrapper>,
    );
    const spinnerElement = screen.queryByTestId('spinner-loader');
    expect(spinnerElement).toBeNull();
  });
});
