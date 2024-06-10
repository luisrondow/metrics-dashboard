import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalBackground, ModalContent, ModalHeader } from './modal.styles';
import { CloseIcon } from '../icons';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRoot = document.getElementById('modal-root')!;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return mounted
    ? createPortal(
        <ModalBackground $isOpen={isOpen} onClick={onClose}>
          <ModalContent data-cy="modal" onClick={(e) => e.stopPropagation()}>
            <ModalHeader data-cy="modal-header">
              <CloseIcon onClick={onClose} />
            </ModalHeader>
            {children}
          </ModalContent>
        </ModalBackground>,
        modalRoot,
      )
    : null;
};

export default Modal;
