import styled from "styled-components";

export const Button = styled.button`
  background-color: var(--primary-color);
  border: none;
  color: #FFF;
  padding: var(--space-sm) var(--space-md);
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: var(--primary-color-light);
  }
`;