import styled, { css } from "styled-components";

type ModalBackgroundProps = {
  $isOpen: boolean;
};

export const ModalBackground = styled.div<ModalBackgroundProps>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  z-index: 1001;
`;