import { FC, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/authProvider";

const ProfileInfoStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .ant-btn-default {
    display: none;
  }

  & .ant-dropdown-trigger {
    display: block;
    border: none;
    padding: 0;
    box-shadow: none;
  }

  & .ant-btn-group > .ant-btn:last-child:not(:first-child) {
    border-radius: 8px;
  }

  & .ant-dropdown-trigger:hover path {
    fill: ${({ theme }) => theme.colors.secondary};
  }
`;

const ProfileInitials = styled.div`
  height: 50px;
  width: 50px;
  display: grid;
  place-items: center;
  border: 1px solid ${({ theme }) => theme.colors.light};
  box-sizing: border-box;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.dark};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: 0 10px 0 10px;
`;


const ProfileInfo: FC = () => {

    const { user } = useAuth();

    const firstName = user.userInfo.basicInfo.firstName;
    const lastName = user.userInfo.basicInfo.lastName; 

    const history = useHistory();

    const initials = firstName && lastName ? firstName[0] + lastName[0] : "JD";

    return (
        <ProfileInfoStyle>
        <ProfileInitials>{initials}</ProfileInitials>
        </ProfileInfoStyle>
    );
};

export default ProfileInfo;
