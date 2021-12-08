/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState, useEffect, useContext } from "react";
import {Col} from 'react-bootstrap'
import { Redirect } from "react-router";
import styled from "styled-components";
import { GlobalContext } from "../../context/Provider";
import { ReactComponent as VienLogo } from "../../assets/DrVienImage.svg";
import SignInArt from "../../assets/DoctorSignIn.svg";
import VienFooter from "../VienFooter";
import PrimaryLink from "../styles/VienLinks";
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
  height: 600px;
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

const PassChecklist = styled.ul`
  list-style: none;
  padding: 0;
`;

const SignIn: FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [checklist, setChecklist] = useState([false, false, false]);
  const [reset, setReset] = useState(false);
  const [render, setRender] = useState<boolean>(false);

  const tmpChecklist = JSON.parse(JSON.stringify(checklist));

  const {
    authDispatch,
    authState: { userID, loading },
  } = useContext(GlobalContext);

  useEffect(() => {
    if (password === confirmPass) {
      if (/(?=.{8,}$)/.test(password)) {
        tmpChecklist[0] = true;
        setChecklist(tmpChecklist);
      }
      if (/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
        tmpChecklist[1] = true;
        setChecklist(tmpChecklist);
      }
      if (/(?=.*\W)/.test(password)) {
        tmpChecklist[2] = true;
        setChecklist(tmpChecklist);
      }
    } else {
      tmpChecklist.fill(false);
      setChecklist(tmpChecklist);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, confirmPass]);

  const validPassword = () => {
    for (let i = 0; i < checklist.length; i++) {
      if (!checklist[i]) return false;
    }
    return true;
  };

  const onSubmit = async () => {
    setRender(true);
    if (validPassword()) {
      setReset(true);
      
    }
    setRender(false);
  };

  const onBack = async () => {
   console.log('back')
  };

  return !userID ? (
    <Redirect to="/sign-in" />
  ) : (
    <Wrapper>
      <PageContent>
        <PageContentChild>
          <VienLogo />
        </PageContentChild>
        <PageContentChild>
          <SignInForm>
            {reset ? (
              <>
                <h1
                  style={{
                    fontWeight: theme.fontWeights.bold,
                    color: theme.colors.primary,
                  }}
                >
                  Reset Successfully
                </h1>
                <p
                  style={{
                    color: theme.colors.dark,
                    fontWeight: theme.fontWeights.medium,
                  }}
                >
                  Your password has been reset successfully.
                </p>
                <PrimaryLink to="/sign-in">
                  <p>hey</p>
                </PrimaryLink>
              </>
            ) : (
              <>
                <PrimaryLink
                  style={{ fontWeight: theme.fontWeights.semiBold }}
                  to="/forgot-password"
                  onClick={onBack}
                >
                  <h1>
                   
                    Back
                  </h1>
                </PrimaryLink>
                <h1
                  style={{
                    fontWeight: theme.fontWeights.bold,
                    color: theme.colors.primary,
                  }}
                >
                  Reset your password
                </h1>
                <p
                  style={{
                    color: theme.colors.dark,
                    fontWeight: theme.fontWeights.medium,
                  }}
                >
                  Create a secure password to protect your health information.
                </p>
                <PassChecklist
                  style={{
                    color: theme.colors.dark,
                    fontWeight: theme.fontWeights.medium,
                  }}
                >
                  <li style={{ color: checklist[0] ? "#1EA2A7" : "" }}>
                  </li>
                  <li style={{ color: checklist[1] ? "#1EA2A7" : "" }}>
                  </li>
                  <li style={{ color: checklist[2] ? "#1EA2A7" : "" }}>
                  </li>
                </PassChecklist>
                <form style={{ marginTop: "5rem" }}>
                  <p>hello world</p>
                </form>
              </>
            )}
          </SignInForm>
        </PageContentChild>
        <PageContentChild>
          <FooterContent>
            <VienFooter />
          </FooterContent>
        </PageContentChild>
      </PageContent>
      <SignInSVG>
        <img alt="Sign In Art" src={SignInArt} />
      </SignInSVG>
    </Wrapper>
  );
};

export default SignIn;
