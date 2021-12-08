import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LocationPinIcon } from "../../assets/LocationPinIcon.svg";

const CardStyle = styled.div`
  background-color: #fff;
  height: auto;
  width: 400px;
  border-radius: 18px;
  box-shadow: 0px 20px 54px rgba(154, 170, 207, 0.12);
  padding: 1.5rem;
  display: flex;

  @media ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
  }
`;

const ImgSection = styled.div`
  margin-right: 0.75rem;

  & img {
    width: 70px;
    height: 70px;
    border-radius: 16px;
  }
`;

const InfoSection = styled.div`
  width: 100%;

  & h2 {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    font-size: ${({ theme }) => theme.fontSizes.large};
    margin-bottom: 0;
  }

  & p {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.dark};
    margin-bottom: 0;
  }

  & > div {
    display: flex;
    align-items: center;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;

  & p {
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const Location = styled.div`
  & p {
    margin: 0 0 0 0.25rem;
    color: ${({ theme }) => theme.colors.light};
  }
`;

const ButtonGroup = styled.div`
  margin-top: 1.25rem;

  & a {
    cursor: pointer;
    border-radius: 10px;
    height: 40px;
    width: 120px;
    display: grid;
    place-items: center;
    font-size: ${({ theme }) => theme.fontSizes.smallest};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    transition: all ease 200ms;
  }

  & a:hover {
    background: ${({ theme }) => theme.colors.secondary};
    color: #fff;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    transition: all ease 200ms;
  }
`;

const PrimaryButton = styled(Link)`
  margin-right: 0.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: 1px solid #123148;
`;

const SecondaryButton = styled(Link)`
  background: #ffffff;
  border: 1px solid #123148;
  color: ${({ theme }) => theme.colors.primary};
`;

export interface ICard {
  pfp: string;
  name: string;
  description: string;
  location?: string;
  followUp?: string;
  primaryText: string;
  secondaryText: string;
}

const DoctorCard: FC<ICard> = ({
  pfp,
  name,
  description,
  location,
  followUp,
  primaryText,
  secondaryText,
}) => {
  return (
    <>
      <CardStyle>
        <ImgSection>
          <img src={pfp} alt={name} />
        </ImgSection>
        <InfoSection>
          <Title>
            <h2>{name}</h2>
            {followUp && <p>{followUp}</p>}
          </Title>
          <p>{description}</p>
          {location && (
            <Location>
              <LocationPinIcon fill="#A2A9B0" /> <p>{location}</p>
            </Location>
          )}
          <ButtonGroup>
            <PrimaryButton to="/appointments">{primaryText}</PrimaryButton>
            <SecondaryButton to="/doctors">{secondaryText}</SecondaryButton>
          </ButtonGroup>
        </InfoSection>
      </CardStyle>
    </>
  );
};

export default DoctorCard;
