import styled from "styled-components";

export const Movable = styled.div`
  margin-bottom: ${({ mb }) => `${mb || 0}px`};
  margin-top: ${({ mt }) => `${mt || 0}px`};
  margin-left: ${({ ml }) => `${ml || 0}px`};
  margin-right: ${({ mr }) => `${mr || 0}px`};
`;
