import React, { Fragment, ReactNode } from "react";
import ReactTabs from "react-bootstrap/Tabs";
import styled from "styled-components";

const Wrapper = styled.div`
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
`;

type TabProps = {
   as?: any,
  children: ReactNode
}

const Tabs = ({ children, as, ...props }: TabProps) => {
  const Render = as || Fragment;

  return (
    <Wrapper>
      <Render>
        <ReactTabs {...props}>{children}</ReactTabs>
      </Render>
    </Wrapper>
  );
};

export default Tabs;