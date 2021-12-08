import React from "react";
import { Dropdown } from "react-bootstrap";
import styled from "styled-components";
import { ReactComponent as VienLogo} from "../../assets/vien-logo.svg";
import * as Icon from "../Icons";
import ProfileInfo from "./ProfileInfo";
import { Link } from "react-router-dom";

type NavProps = {
  src: string;
  onClick: () => void;
}

const Nav = ({ src, onClick }: NavProps) => {
  return (
    <TopNav>
      <div className="navbar-brand">
        <Icon.Logo />
      </div>

      <div className="topnav__nav-items">
        <NavDropdown>
          <NavDropdownToggle className="d-flex align-items-center">
            <Avatar>
              {/* <img src={src || process.env.REACT_APP_PLACEHOLDER_PROFILE_PICTURE} alt="pic of doctor" /> */}
              <ProfileInfo />
            </Avatar>
            <Icon.Dropdown size={20} />
          </NavDropdownToggle>

          <Dropdown.Menu>
            {/* <Dropdown.Item as="div" className="cursor-pointer" onClick={onClick}>My Profile</Dropdown.Item> */}
            <Dropdown.Item>
              <Link to="/profile">
                <span>My Profile</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item as="div" className="cursor-pointer" onClick={onClick}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </NavDropdown>
      </div>
    </TopNav>
  );
};


const TopNav = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
  padding-right: 24px;
  padding-left: 24px;
  box-shadow: inset 0px -1.2px 0px #e2e2ea;
  background-color: var(--white);
  justify-content: space-between;
  .topnav__nav-items {
    display: flex;
    align-items: center;
  }
`;

export const NavDropdown = styled(Dropdown)``;

export const NavDropdownToggle = styled(Dropdown.Toggle)``;

const Avatar = styled.div`
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    object-position: center;
    border-radius: 12px;
    border: solid 1px var(--placeholder);
    background-color: var(--white);
  }
`;

export default Nav;