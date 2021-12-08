import styled from "styled-components";

export const LargestText = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.largest};
  color: ${({ theme }) => theme.colors.primary};
`;

export const LargeText = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

const MediumText = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

export const SmallText = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

export const SmallestText = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.smallest};
`;

export default MediumText;
