import { render, screen, fireEvent } from '@testing-library/react';

import TimeMeasurementToggle from './time-toggle.component';

jest.mock('../Switch', () => {
  const Switch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <input type="checkbox" checked={checked} onChange={onChange} />
  );
  Switch.displayName = 'Switch';
  return Switch;
});

jest.mock('./time-toggle.styles', () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  Wrapper.displayName = 'Wrapper';
  return { Wrapper };
});

describe('TimeMeasurementToggle Component', () => {
  let toggleTimeMeasurement: jest.Mock;

  beforeEach(() => {
    toggleTimeMeasurement = jest.fn();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <TimeMeasurementToggle timeMeasurement="secs" toggleTimeMeasurement={toggleTimeMeasurement} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the toggle with seconds and hours labels', () => {
    render(<TimeMeasurementToggle timeMeasurement="secs" toggleTimeMeasurement={toggleTimeMeasurement} />);
    expect(screen.getByText('Seconds')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
  });

  it('renders the switch in the correct state', () => {
    const { rerender } = render(
      <TimeMeasurementToggle timeMeasurement="secs" toggleTimeMeasurement={toggleTimeMeasurement} />,
    );
    let switchInput = screen.getByRole('checkbox');
    expect(switchInput).not.toBeChecked();

    rerender(<TimeMeasurementToggle timeMeasurement="hours" toggleTimeMeasurement={toggleTimeMeasurement} />);
    switchInput = screen.getByRole('checkbox');
    expect(switchInput).toBeChecked();
  });
});
