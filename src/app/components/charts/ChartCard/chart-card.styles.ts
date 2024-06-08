import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  border-bottom: 1px solid #f0f0f0;
`;

export const Title = styled.h4`
  font-size: 1.25rem;
  font-weight: 500;
  color: #000;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 450px;
  width: 100%;
`;