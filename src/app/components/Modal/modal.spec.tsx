import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './modal.component';

jest.mock('./modal.styles', () => ({
  ModalBackground: ({
    isOpen,
    children,
    onClick,
  }: {
    isOpen: boolean;
    children: React.ReactNode;
    onClick: () => void;
  }) => (
    <div data-testid="modal-background" style={{ display: isOpen ? 'block' : 'none' }} onClick={onClick}>
      {children}
    </div>
  ),
  ModalContent: ({ children, onClick }: { children: React.ReactNode; onClick: (e: React.MouseEvent) => void }) => (
    <div data-testid="modal-content" onClick={onClick}>
      {children}
    </div>
  ),
  ModalHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('../icons', () => ({
  CloseIcon: ({ onClick }: { onClick: () => void }) => <button onClick={onClick}>Close</button>,
}));

describe('Modal Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="modal-root"></div>';
  });

  // add a snapshot test
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders modal when mounted', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>,
    );

    const modalContent = screen.getByText('Modal Content');
    expect(modalContent).toBeInTheDocument();
  });

  it('calls onClose when background is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    const background = screen.getByTestId('modal-background');
    fireEvent.click(background);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when content is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    const content = screen.getByTestId('modal-content');
    fireEvent.click(content);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls onClose when close icon is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>,
    );

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
