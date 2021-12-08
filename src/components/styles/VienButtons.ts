import styled from "styled-components";

const VienPrimaryButton = styled.button`
  background: #123148;
  color: #fff;
  border-radius: 14px;
  border: none;
  padding: 1rem;
  width: 100%;
  transition: background 200ms ease-out;

  &:focus {
    outline: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    cursor: pointer;
  }
`;

export const VienDisabledButton = styled.button`
  background: #c3cad0;
  color: #fff;
  border-radius: 14px;
  border: none;
  padding: 1rem;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

export default VienPrimaryButton;
