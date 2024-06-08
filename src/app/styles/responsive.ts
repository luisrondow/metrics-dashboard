import styled from "styled-components";

export const SCREEN_MAX_WIDTH = 1440;

export const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  max-width: ${SCREEN_MAX_WIDTH}px;
  position: relative;
  margin: 0 auto;
`;