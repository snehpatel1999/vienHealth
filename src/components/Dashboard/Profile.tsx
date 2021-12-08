import { FC, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/authProvider";
import HeadMeta from "../Layout/HeadMeta";
import Layout from "../Layout/Layout";
import { Image, Container, Col, Row, Form } from "react-bootstrap";
import Stack from 'react-bootstrap/Stack';
import VienPrimaryButton from "../styles/VienButtons";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import theme from "../../theme/theme";
import DegreeSelect from "../styles/DegreeSelect";

interface ProfileProps {
    active?: boolean,
}

const Profile:FC<ProfileProps> = () => {
    const {user} = useAuth();
    const [edit, setEdit] = useState({ edit1: false, edit2: false, edit3: false });

    return (
        <div>
            <HeadMeta title="Profile Page - Holistic Health | Vien Health"
                description="Profile Page - Holistic Health | Vien Health">
            <Layout>
                <Content>
                    <Main>
                        <Container>
                            <Row>
                                <Col sm={1}></Col>
                                <Col>
                                    <Stack gap={5} className="mx-auto">
                                        <ProfileImage src={user.userInfo.photoID.location} rounded={true}/>
                                        <DoctorName>
                                            <span>Dr. {user.userInfo.basicInfo.firstName}</span>
                                        </DoctorName>
                                        <VienPrimaryButton style={{marginTop: "1.5rem"}}>Change Profile Picture</VienPrimaryButton>
                                    </Stack>
                                </Col>
                                <Col></Col>
                                <Col></Col>
                                <Col sm="auto">
                                    <Stack gap={5} className="mx-auto">
                                        <CompleteProfileStyle>
                                            <div>
                                            <ProgressBar
                                                value={100}
                                                text="100%"
                                                strokeWidth={12}
                                                styles={buildStyles({pathColor:`${theme.colors.secondary}`, trailColor:"#E2E2EA"})}
                                            />
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <CompleteProfileTitle>
                                                    Hi, <span>Dr. {user.userInfo.basicInfo.firstName}</span>; your profile is complete.
                                                    <p>
                                                        Keep your information up-to-date for a better experience!
                                                    </p>
                                                </CompleteProfileTitle>
                                            </div>
                                        </CompleteProfileStyle>

                                        {edit.edit1 ?
                                                    <ProfileStyle style={{top: "15rem"}}>
                                                        <span>Date of Birth:
                                                            <FormStyle style={{top: "0.5rem"}}>
                                                                <Form.Control style={{height: "50%"}} size="lg" type="DOB" placeholder="01/01/1982"/>
                                                            </FormStyle>
                                                        </span>
                                                        <span>Phone Number:
                                                            <FormStyle style={{top: "3.5rem"}}>
                                                                <Form.Control style={{height: "50%"}} size="lg" type="PhoneNumber" placeholder="123-456-7890"/>
                                                            </FormStyle>
                                                        </span>
                                                        <span style={{marginBottom: "0.25rem"}}>Location:
                                                            <FormStyle style={{top: "6.5rem"}}>
                                                                <Form.Control style={{height: "50%"}} size="lg" type="Location" placeholder="Fort Worth, Tx"/>
                                                            </FormStyle>
                                                        </span>
                                                        <VienPrimaryButton onClick={function () {setEdit({...edit, edit1: false});}} style={{position: "absolute", width: "25%", right: "3rem"}}>Save</VienPrimaryButton>
                                                    </ProfileStyle>
                                                    :
                                                    <ProfileStyle style={{top: "15rem"}}>
                                                        <span>Date of Birth:
                                                            <FormStyle style={{top: "0.5rem"}}>
                                                                <Form.Control plaintext read-only style={{height: "50%"}} size="lg" type="DOB" placeholder="01/01/1982"/>
                                                            </FormStyle>
                                                        </span>
                                                        <span>Phone Number:
                                                            <FormStyle style={{top: "3.5rem"}}>
                                                                <Form.Control plaintext read-only style={{height: "50%"}} size="lg" type="PhoneNumber" placeholder="123-456-7890"/>
                                                            </FormStyle>
                                                        </span>
                                                        <span style={{marginBottom: "0.25rem"}}>Location:
                                                            <FormStyle style={{top: "6.5rem"}}>
                                                                <Form.Control plaintext read-only style={{height: "50%"}} size="lg" type="Location" placeholder="Fort Worth, Tx"/>
                                                            </FormStyle>
                                                        </span>
                                                        <VienPrimaryButton onClick={function () {setEdit({...edit, edit1: true});}} style={{position: "absolute", width: "25%", right: "3rem"}}>Edit</VienPrimaryButton>
                                                    </ProfileStyle>   
                                            }

                                        <ProfileStyle style={{top: "27rem"}}>
                                            <span>Degree:
                                                <FormStyle style={{top: "0.5rem"}}>
                                                    <DegreeSelect style={{}}/>
                                                </FormStyle>
                                            </span>
                                            <span>Specialty:
                                                <FormStyle style={{top: "3.5rem"}}>
                                                    <Form.Control style={{height: "50%"}} size="lg" type="Specialty" placeholder="123-456-7890"/>
                                                </FormStyle>
                                            </span>
                                            <span>Photo ID:
                                                <FormStyle style={{top: "6.5rem"}}>
                                                    <Form.Control style={{height: "50%"}} size="lg" type="PhotoID" placeholder="123-456-7890"/>
                                                </FormStyle>
                                            </span>
                                            <span style={{marginBottom: "0.25rem"}}>Registration:
                                                <FormStyle style={{top: "9.5rem"}}>

                                                </FormStyle>
                                            </span>
                                            <VienPrimaryButton style={{position: "absolute", width: "25%", right: "3rem"}}>Edit</VienPrimaryButton>
                                        </ProfileStyle>

                                        {edit.edit2 ?
                                            <ProfileStyle style={{top: "42rem"}}>
                                                <span>Contact Person:
                                                    <FormStyle style={{top: "0.5rem"}}>
                                                        <Form.Control style={{height: "50%"}} size="lg" type="DOB" placeholder="01/01/1982"/>
                                                    </FormStyle>
                                                </span>
                                                <span>Phone Number:
                                                    <FormStyle style={{top: "3.5rem"}}>
                                                        <Form.Control style={{height: "50%"}} size="lg" type="PhoneNumber" placeholder="123-456-7890"/>
                                                    </FormStyle>
                                                </span>
                                                <span style={{marginBottom: "0.25rem"}}>Relationship:
                                                    <FormStyle style={{top: "6.5rem"}}>
                                                        <Form.Control style={{height: "50%"}} size="lg" type="Location" placeholder="Fort Worth, Tx"/>
                                                    </FormStyle>
                                                </span>
                                                <VienPrimaryButton onClick={function () {setEdit({...edit, edit2: false});}} style={{position: "absolute", width: "25%", right: "3rem"}}>Edit</VienPrimaryButton>
                                            </ProfileStyle>
                                        :
                                            <ProfileStyle style={{top: "42rem"}}>
                                                <span>Contact Person:
                                                    <FormStyle style={{top: "0.5rem"}}>
                                                        <Form.Control plaintext read-only style={{height: "50%"}} size="lg" type="DOB" placeholder="01/01/1982"/>
                                                    </FormStyle>
                                                </span>
                                                <span>Phone Number:
                                                    <FormStyle style={{top: "3.5rem"}}>
                                                        <Form.Control plaintext read-only style={{height: "50%"}} size="lg" type="PhoneNumber" placeholder="123-456-7890"/>
                                                    </FormStyle>
                                                </span>
                                                <span style={{marginBottom: "0.25rem"}}>Relationship:
                                                    <FormStyle style={{top: "6.5rem"}}>
                                                        <Form.Control plaintext read-only style={{height: "50%"}} size="lg" type="Location" placeholder="Fort Worth, Tx"/>
                                                    </FormStyle>
                                                </span>
                                                <VienPrimaryButton onClick={function () {setEdit({...edit, edit2: true});}} style={{position: "absolute", width: "25%", right: "3rem"}}>Edit</VienPrimaryButton>
                                            </ProfileStyle>
                                        }

                                    </Stack>
                                </Col>
                            </Row>
                        </Container>
                    </Main>
                </Content>
            </Layout>
            </HeadMeta>
        </div>
    );
}

const ProfileImage = styled(Image)`
    width: 346px;
    height: 325px;
    padding: 0.5em;
    margin: 0.5em;
    position: sticky;
`;

const ProgressBar = styled(CircularProgressbar)`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FormStyle = styled(Form)`
    position: absolute;
    right: 20rem;
`;

const Main = styled.div`
  
`;

const Content = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr 428px;
  justify-content: space-between;
  // box-shadow: var(--shadow);
  // border-radius: 6px;
  // padding-top: 32px;
  // .top__card {
  //   background-color: var(--light-blue);
  //   padding: 40px;
  //   border-radius: 24px;
  //   h1 {
  //     font-size: 34px;
  //   }
  //   &__heading {
  //     padding-top: 40px;
  //     padding-bottom: 24px;
  //     color: var(--dark-navy);
  //     font-size: 22px;
  //     line-height: 30px;
  //   }
  // }
  // .activities__card {
  //   gap: 32px;
  //   display: grid;
  //   margin-bottom: 16px;
  //   grid-template-columns: repeat(2, 1fr);
  // }


  // .appointments {
  //   display: grid;
  //   gap: 32px;
  //   grid-template-columns: repeat(2, 1fr);

  //   &__heading {
  //     padding-top: 24px;
  //     padding-bottom: 24px;
  //     display: flex;
  //     justify-content: space-between;
  //     font-size: 22px;
  //     line-height: 30px;
  //     color: var(--dark-navy);
  //   }
  //   &__card {
  //     gap: 8px;
  //     padding: 16px;
  //     display: grid;
  //     background-color: var(--white);
  //     border: solid 1px var(--stroke);
  //     border-radius: 18px;
  //     grid-template-columns: 70px minmax(0, 1fr);
  //     .avatar {
  //       border-radius: 16px;
  //       width: 70px;
  //       height: 70px;
  //       object-fit: cover;
  //       object-position: center;
  //       background-color: var(--gray);
  //     }
  //     .btn-40 {
  //       border-radius: 10px !important;
  //       padding: 10px;
  //       margin:0 4px;
  //     }

  //     .btn-outline {
  //       text-decoration: none;
  //       margin:0 4px;
  //       color: var(--default);
  //       border: solid 1px var(--default);
  //       align-items: center;
  //       border-radius: 10px;
  //       font-weight: 500;
  //       padding: 10px;
  //       font-size: 14px;
  //       line-height: 18px;
  //       display: flex;
  //     }
  //   }
  // }
`;

const DoctorName = styled.h4`
    font-weight: ${({ theme }) => theme.fontWeights.semiBold} !important;
    color: ${({ theme }) => theme.colors.primary} !important;
    margin-bottom: 2;
    position: absolute;
    top: 18.75em;
    left: 17em;

    & span {
        color: ${({ theme }) => theme.colors.primary};
    }

    @media ${({ theme }) => theme.mediaQueries.md} {
        font-size: 0.25em !important;
    }
`;

const ProfileStyle = styled.div`
    width: 900px;
    padding: 13px 24px;
    margin-bottom: 1.5rem;
    display: grid;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #c3cad0;
    background-color: #fff;
    border-radius: 24px;
    position: absolute;
    right: 5rem;

    & div {
        display: flex;
        align-items: center;
    }

    & span {
        color: ${({ theme }) => theme.colors.primary};
        font-weight: ${({ theme }) => theme.fontWeights.semiBold};
        margin-bottom: 1.5rem;
    }
    
    @media ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
    }
`;

const CompleteProfileStyle = styled.div`
  width: 900px;
  padding: 13px 24px;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #c3cad0;
  background-color: #fff;
  border-radius: 24px;
  position: absolute;
  right: 5rem;

  & div {
    display: flex;
    align-items: center;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: column;
  }
`;

const CompleteProfileTitle = styled.h2`
  font-size: 22px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0;

  & span {
      color: ${({ theme }) => theme.colors.secondary};
  }

  & p {
    font-size: ${({ theme }) => theme.fontSizes.smallest};
    font-weight: ${({ theme }) => theme.fontWeights.light};
    color: ${({ theme }) => theme.fontWeights.dark};
    margin: 0.15rem 0 0 0;
  }

  @media only screen and (max-width: 1300px) and (min-width: 992px) {
    margin-bottom: 1rem;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: 1rem;
  }
`;

export default Profile;