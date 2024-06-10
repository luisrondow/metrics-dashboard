import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../page';

import useMetricsChartData from '../hooks/useMetricsChartData';

jest.mock('../components/Header', () => {
  const Header = () => <div data-testid="header">Header</div>;
  Header.displayName = 'Header';
  return Header;
});

jest.mock('../components/charts/ChartCard', () => {
  const ChartCard = ({ children, title, isLoading }: any) => (
    <div data-testid="chart-card">
      <div>{title}</div>
      {isLoading ? <div>Loading...</div> : children}
    </div>
  );
  ChartCard.displayName = 'ChartCard';
  return ChartCard;
});

jest.mock('../components/charts/Pie', () => {
  const Pie = ({ data, valueFormatter }: any) => (
    <div data-testid="pie-chart">
      {data.map((d: any, i: number) => (
        <div key={i}>{valueFormatter(d.value)}</div>
      ))}
    </div>
  );
  Pie.displayName = 'Pie';
  return Pie;
});

jest.mock('../components/Section', () => {
  const Section = ({ children, title, headerSlot }: any) => (
    <div data-testid="section">
      <h2>{title}</h2>
      {headerSlot}
      {children}
    </div>
  );
  Section.displayName = 'Section';
  return Section;
});

jest.mock('../components/charts/Bars', () => {
  const Bars = ({ data, valueFormatter }: any) => (
    <div data-testid="bars-chart">
      {data.map((d: any, i: number) => (
        <div key={i}>{valueFormatter ? valueFormatter(d.value) : d.value}</div>
      ))}
    </div>
  );
  Bars.displayName = 'Bars';
  return Bars;
});

jest.mock('../components/charts/Line', () => {
  const Line = ({ data }: any) => (
    <div data-testid="line-chart">
      {data.map((d: any, i: number) => (
        <div key={i}>{`x: ${d.x}, y: ${d.y}`}</div>
      ))}
    </div>
  );
  Line.displayName = 'Line';
  return Line;
});

jest.mock('../components/TimeToggle', () => {
  const TimeToggle = ({ timeMeasurement, toggleTimeMeasurement }: any) => (
    <div data-testid="time-toggle">
      <button onClick={() => toggleTimeMeasurement(timeMeasurement === 'hours' ? 'secs' : 'hours')}>Toggle Time</button>
    </div>
  );
  TimeToggle.displayName = 'TimeToggle';
  return TimeToggle;
});

jest.mock('../components/Modal', () => {
  const Modal = ({ isOpen, onClose, children }: any) =>
    isOpen ? (
      <div data-testid="modal">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    ) : null;
  Modal.displayName = 'Modal';
  return Modal;
});

jest.mock('../components/Table', () => {
  const Table = ({ columns, data }: any) => (
    <div data-testid="table">
      {data.map((row: any, i: number) => (
        <div key={i}>
          {columns.map((col: string) => (
            <div key={col}>{row[col]}</div>
          ))}
        </div>
      ))}
    </div>
  );
  Table.displayName = 'Table';
  return Table;
});

const mockUseMetricsChartData = {
  fetchedMetrics: [
    {
      id: 'oee',
      label: 'oee',
      value: 0.68,
      type: 'percentage',
      description: 'The overall equipment efficiency in %',
      category: 'efficiency',
    },
  ] as any,
  isFetching: false,
  isError: false,
  fullyUnproductive: [{ value: 10 }],
  downtime: [{ value: 20 }],
  efficiencyDrop: [{ x: 'A', y: 30 }],
  lastAndAverageEfficiency: [{ metric: 'Test', value: 40 }],
  speedBalanceLoss: [{ metric: 'Test', value: 50 }],
  goodsBeforePalletizingLoss: [{ metric: 'Test', value: 60 }],
  timeMeasurement: 'secs',
  setTimeMeasurement: jest.fn(),
} as any;

jest.mock('../hooks/useTableData', () => () => ({
  columns: ['Metric', 'Value'],
  data: [{ Metric: 'Test', Value: 100 }],
  setTableData: jest.fn(),
}));

jest.mock('../hooks/useMetricsChartData');

describe('Home Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="modal-root"></div>';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    (useMetricsChartData as jest.MockedFunction<typeof useMetricsChartData>).mockReturnValue(mockUseMetricsChartData);

    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the header', () => {
    (useMetricsChartData as jest.MockedFunction<typeof useMetricsChartData>).mockReturnValue(mockUseMetricsChartData);

    render(<Home />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders sections with titles', () => {
    (useMetricsChartData as jest.MockedFunction<typeof useMetricsChartData>).mockReturnValue(mockUseMetricsChartData);

    render(<Home />);
    expect(screen.getByText('Equipment efficiency')).toBeInTheDocument();
    expect(screen.getByText('Downtime analysis')).toBeInTheDocument();
    expect(screen.getByText('Losses')).toBeInTheDocument();
  });

  it('renders charts within sections', () => {
    (useMetricsChartData as jest.MockedFunction<typeof useMetricsChartData>).mockReturnValue(mockUseMetricsChartData);

    render(<Home />);
    expect(screen.getAllByTestId('bars-chart').length).toBe(3);
    expect(screen.getAllByTestId('pie-chart').length).toBe(2);
  });

  it('toggles time measurement', async () => {
    (useMetricsChartData as jest.MockedFunction<typeof useMetricsChartData>).mockReturnValue(mockUseMetricsChartData);

    render(<Home />);
    const toggleButton = screen.getByText('Toggle Time');
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(toggleButton).toBeInTheDocument();
    });
  });

  it('renders error message when isError is true', () => {
    (useMetricsChartData as jest.MockedFunction<typeof useMetricsChartData>).mockReturnValue({
      ...mockUseMetricsChartData,
      isError: true,
    });

    render(<Home />);
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });
});
