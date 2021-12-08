import { Link } from "react-router-dom";
import styled from "styled-components";

const PrimaryLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export const SecondaryLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
`;

export default PrimaryLink;
