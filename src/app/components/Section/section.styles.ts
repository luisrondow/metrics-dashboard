import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-lg);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-direction: column;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const Section = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);

    & > :only-child {
      grid-column: span 2;
    }
  }
`;