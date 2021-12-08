import { FC } from "react";
import styled from "styled-components";


const VienFooterStyle = styled.p`
  color: #697077;
  font-weight: 600;
  margin-top: auto;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 48px;

  & > a {
    color: #123148;
  }
`;

const VienFooter: FC = () => {
  return (
    <VienFooterStyle>
      &copy; {new Date().getFullYear()} Vien Health &#9679;{" "}
      <a target="_blank" rel="noreferrer" href={process.env.REACT_APP_VIEN_TERMS_AND_CONDITIONS}>Terms &amp; Conditions</a> &#9679;{" "}
      <a target="_blank" rel="noreferrer" href={process.env.REACT_APP_VIEN_PRIVACY_POLICY}>Privacy Policy</a>
    </VienFooterStyle>
  );
};

export default VienFooter;
