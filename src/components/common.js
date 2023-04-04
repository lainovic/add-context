import styled from "styled-components";

export const Margin = styled.div`
  margin-top: ${({ mt }) => `${mt || 0}px`};
  margin-bottom: ${({ mb }) => `${mb || 0}px`};
  margin-start: ${({ ms }) => `${ms || 0}px`};
  margin-end: ${({ me }) => `${me || 0}px`};
`;

export const ShiftBy = styled.div`
  transform: ${({ x, y }) => `translate(${x || 0}px, ${y || 0}px)`};
`;
