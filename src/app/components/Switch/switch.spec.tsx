import { render, screen, fireEvent } from '@testing-library/react';

import Switch from './switch.component';

jest.mock('./switch.styles', () => {
  const SwitchContainer = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  SwitchContainer.displayName = 'SwitchContainer';

  const SwitchLabel = ({ children, checked }: { children: React.ReactNode; checked: boolean }) => (
    <label>{children}</label>
  );
  SwitchLabel.displayName = 'SwitchLabel';

  const SwitchInput = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <input type="checkbox" checked={checked} onChange={onChange} />
  );
  SwitchInput.displayName = 'SwitchInput';

  const SwitchSlider = ({ checked }: { checked: boolean }) => <span />;
  SwitchSlider.displayName = 'SwitchSlider';

  return { SwitchContainer, SwitchLabel, SwitchInput, SwitchSlider };
});

describe('Switch Component', () => {
  it('renders switch correctly', () => {
    render(<Switch checked={false} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('switch is checked when checked prop is true', () => {
    render(<Switch checked={true} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onChange when switch is toggled', () => {
    const handleChange = jest.fn();
    render(<Switch checked={false} onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
