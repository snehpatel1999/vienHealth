import * as React from 'react';
import { useHistory } from "react-router";
import styled from "styled-components";

import { useAuth } from '../../context/authProvider';
import * as Icon from "../Icons"
import Nav from '../Dashboard/Nav';

export interface LayoutProps {
    
}
 
const Layout: React.FC<LayoutProps> = ({children}) => {
      /**
   * state
   */
  const { user, signout } = useAuth();
  let history = useHistory();
  let sidebarColor = "#A2A9B0"

    return ( 
       <div>
            <Nav src={user.userInfo.basicInfo.image} onClick={() => signout(() => history.push("/"))} />
            <Body>
                <SideNav>
                <div className="sidenav" onClick={(e) => e.stopPropagation()}>
                    <div className="text-center mt-16">
                    <a href="/dashboard" className="text-decoration-none dark-navy-text font-weight-600">
                      <Icon.Menu size={40}/>
                      <p>Dashboard</p>
                    </a>
                    </div>
                </div>
                </SideNav>

                <Content>
                    {children}
                </Content>

                
            </Body>
        </div>
     );
}

/**
 * styles
 */
const Body = styled.div`
  height: 100%;
  padding-bottom: 32px;
  padding-right: 24px;
  background-color: var(--off-white);
  @media (min-width: 992px) {
    gap: 32px;
    display: grid;
    grid-template-columns: 140px 1fr;
  }
`;

const Content = styled.div`
  box-shadow: var(--shadow);
  border-radius: 6px;
  padding-top: 32px;
  .top__card {
    background-color: var(--light-blue);
    padding: 40px;
    border-radius: 24px;
    h1 {
      font-size: 34px;
    }
    &__heading {
      padding-top: 40px;
      padding-bottom: 24px;
      color: var(--dark-navy);
      font-size: 22px;
      line-height: 30px;
    }
  }
  .activities__card {
    gap: 32px;
    display: grid;
    margin-bottom: 16px;
    grid-template-columns: repeat(2, 1fr);
  }


  .appointments {
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(2, 1fr);

    &__heading {
      padding-top: 24px;
      padding-bottom: 24px;
      display: flex;
      justify-content: space-between;
      font-size: 22px;
      line-height: 30px;
      color: var(--dark-navy);
    }
    &__card {
      gap: 8px;
      padding: 16px;
      display: grid;
      background-color: var(--white);
      border: solid 1px var(--stroke);
      border-radius: 18px;
      grid-template-columns: 70px minmax(0, 1fr);
      .avatar {
        border-radius: 16px;
        width: 70px;
        height: 70px;
        object-fit: cover;
        object-position: center;
        background-color: var(--gray);
      }
      .btn-40 {
        border-radius: 10px !important;
        padding: 10px;
        margin:0 4px;
      }

      .btn-outline {
        text-decoration: none;
        margin:0 4px;
        color: var(--default);
        border: solid 1px var(--default);
        align-items: center;
        border-radius: 10px;
        font-weight: 500;
        padding: 10px;
        font-size: 14px;
        line-height: 18px;
        display: flex;
      }
    }
  }
`;

const SideNav = styled.div`
  background-color: var(--white);
  height: 100vh;
//   overflow-y: auto;
`;
 
export default Layout;