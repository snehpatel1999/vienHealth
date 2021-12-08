/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState, useContext } from "react";
import {Col} from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../../context/Provider";
import VienFooter from "../VienFooter";
import { ReactComponent as DrVienLogo } from "../../assets/DrVienImage.svg";
import SignInArt from "../../assets/DoctorSignIn.svg";
import VienPrimaryButton, { VienDisabledButton } from "../styles/VienButtons";
import { SecondaryLink } from "../styles/VienLinks";
import theme from "../../theme/theme";

const Wrapper = styled.div`
  background-color: #fff;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr;
  }
`;

const SignInForm = styled.div`
  width: 450px;
  margin: 0 6rem;
`;

const FooterContent = styled.p`
  margin: 0 6rem;
  color: #697077;
  font-size: ${({ theme }) => theme.fontSizes.smallest};
`;

const PageContentChild = styled.div`
  flex-basis: 100%;
`;

const SignInSVG = styled(Col)`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 50vw;
  display: flex;
  justify-content: center;
  align-content: end;
  background-color: #f5fdff;
  z-index: 1;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`;

const PageContent = styled.div`
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  z-index: 2;
  background-color: #fff;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    align-content: space-between;
    justify-content: center;

    ${SignInForm}, ${FooterContent} {
      margin: 0;
      width: 100%;
    }

    ${SignInSVG} {
      display: none;
    }
  }
`;

const InnerFormDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SignIn: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();
  const {
    authDispatch,
    authState: { loading, errorMessage },
  } = useContext(GlobalContext);

  if (phoneNumber === undefined) setPhoneNumber("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const payload = email ? { email, password } : { phoneNumber, password };

  };
  return (
    <Wrapper>
      <PageContent>
        <PageContentChild>
          <DrVienLogo />
        </PageContentChild>
        <PageContentChild>
          <p>hello world</p>
        </PageContentChild>
        <PageContentChild>
          <FooterContent>
            <VienFooter />
          </FooterContent>
        </PageContentChild>
      </PageContent>
      <SignInSVG>
        <img alt="User Selection Art" src={SignInArt} />
      </SignInSVG>
    </Wrapper>
  );
};

export default SignIn;
