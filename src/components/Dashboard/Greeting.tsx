import { FC } from "react";
import styled from "styled-components";
import { ReactComponent as LocationPinIcon } from "../../assets/LocationPinIcon.svg";
import OpenQuote from "../Icons/OpenQuote";
import CloseQuote from "../Icons/CloseQuote";
import { useAuth } from "../../context/authProvider";

const GreetingStyle = styled.div`
  width: 100%;
  height: 213px;
  background-color: #eff4fa;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  & div {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.dark};
  }

  & p {
    margin: 0 0 0 0.25rem;
  }
`;

const GreetingTitle = styled.h1`
  font-weight: ${({ theme }) => theme.fontWeights.semiBold} !important;
  color: ${({ theme }) => theme.colors.primary} !important;
  margin-bottom: 0;

  & span {
    color: ${({ theme }) => theme.colors.secondary};
  }

  @media ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 2.25em !important;
  }
`;

const QuoteBlock = styled.div`
  margin-top: 1.5rem;
  // & span {
  //   font-size: 22px;
  //   color: ${({ theme }) => theme.colors.primary};
  //   margin: 0 0.4rem;
  // }
`;

const QuoteText = styled.span`
  font-size: 1.25em;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0.4rem !important;
`;

const Greeting: FC = () => {
  const { user } = useAuth();

  return (
    <GreetingStyle>
      <GreetingTitle>
        Good morning,{" "} <span>Dr. {user.userInfo.basicInfo.firstName}</span>
      </GreetingTitle>
      <div>
        <LocationPinIcon /> <p>{user.userInfo.basicInfo.city}, {user.userInfo.basicInfo.country}</p>
      </div>
      <QuoteBlock>
        <OpenQuote />
        <QuoteText>Happiness is the highest form of health.</QuoteText>
        <CloseQuote />
      </QuoteBlock>
    </GreetingStyle>
  );
};

export default Greeting;
