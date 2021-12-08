import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

import {ReactComponent as Illustration} from "../../assets/sign-in.svg";
import Logo from "../../assets/vien-logo.svg"
import VienFooter from "../VienFooter";

const Auth = ({ children, ...props } : {children: any}) => {
  return (
    <Wrapper {...props} fluid>
      <Row>
        <Main md="6">
          <div className="logo">
            <img alt="logo" src={Logo} />
          </div>
          <Content>{children}</Content>
          <div>
            <VienFooter />
          </div>
        </Main>

        <Column md="6">
          <Illustration />
        </Column>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  height: 100%;
  width: 100%;
  position: relative;
  overflow-y: hidden;
  background-color: #fff;
`;

const Main = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .logo {
    margin: 24px 0 0 32px;
  }
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;

  @media(min-width: 768px) {
    max-width: 462px;
    padding-top: 160px;
  }
`;

const Column = styled(Col)`
  display: none;
  align-items: center;
  margin: auto;
  background-color: #f5fdff;
  svg {
    width: 100%;
    height: 100vh;
  }
  @media (min-width: 768px) {
    display: flex;
  }
`;

export default Auth;