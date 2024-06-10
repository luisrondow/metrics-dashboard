import { render, screen, fireEvent } from '@testing-library/react';

import Section from './section.component';

jest.mock('../Button', () => {
  const Button = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
    <button onClick={onClick}>{children}</button>
  );
  Button.displayName = 'Button';
  return Button;
});

jest.mock('./section.styles', () => ({
  Wrapper: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Header: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Section: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Section Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Section title="Section Title">
        <p>Section Content</p>
      </Section>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the section with title and children', () => {
    render(
      <Section title="Section Title">
        <p>Section Content</p>
      </Section>,
    );
    expect(screen.getByText('Section Title')).toBeInTheDocument();
    expect(screen.getByText('Section Content')).toBeInTheDocument();
  });

  it('renders the header slot if provided', () => {
    render(
      <Section title="Section Title" headerSlot={<div>Header Slot</div>}>
        <p>Section Content</p>
      </Section>,
    );
    expect(screen.getByText('Header Slot')).toBeInTheDocument();
  });

  it('renders the show table button if handleOpenTable is provided', () => {
    const handleOpenTable = jest.fn();
    render(
      <Section title="Section Title" handleOpenTable={handleOpenTable}>
        <p>Section Content</p>
      </Section>,
    );
    const button = screen.getByText('Show table');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleOpenTable).toHaveBeenCalledTimes(1);
  });

  it('does not render the show table button if handleOpenTable is not provided', () => {
    render(
      <Section title="Section Title">
        <p>Section Content</p>
      </Section>,
    );
    const button = screen.queryByText('Show table');
    expect(button).toBeNull();
  });
});
