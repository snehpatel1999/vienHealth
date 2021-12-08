import * as React from 'react';
import { Badge } from 'react-bootstrap';
import dayjs from 'dayjs'
import useSWR from 'swr'
import { useParams } from 'react-router';
import styled from "styled-components";

import Tablet from "../components/Icons/Tablet"
import Layout from '../components/Layout/Layout';
import HeadMeta from '../components/Layout/HeadMeta';

export interface DetailsPageProps {
    
}
 
const DetailsPage: React.FC<DetailsPageProps> = () => {
    /**
   * variables
   */
    const parsed: any = useParams()  
    


    /**
     * apis
     */

    const { data: patient } = useSWR(`/api/doctor/appointment/${parsed?.slug}`)
    const { data: notes } = useSWR(`api/doctor/medical/records/notes/get?appointment_id=${parsed?.slug}`)
    const { data: prescriptions } = useSWR(`api/doctor/medical/records/prescriptions/get?appointment_id=${parsed?.slug}`)
    const { data: plans } = useSWR(`api/doctor/medical/records/plans/get?appointment_id=${parsed?.slug}`)

    const fullname =  `${patient?.patient_id?.basicInfo?.firstName} ${patient?.patient_id?.basicInfo?.lastName}` || ""


    return ( 
        <Layout>
            <HeadMeta title={`${fullname} - Holistic Health | Vien Health`}>
            {patient && (
            <Grid>
                <Prescription>
                    <ProfileCard>
                        <img src={patient?.patient_id?.basicInfo?.image ||process.env.REACT_APP_PLACEHOLDER_PROFILE_PICTURE} alt="avatar" />
                        <h2 className="mb-0">{fullname}</h2>
                    </ProfileCard>

                    <h2>Prescriptions</h2>
                    {prescriptions?.records?.length > 0 ? (
                        <React.Fragment>
                            {prescriptions?.records.map((prescription: any, key: number) => (
                                <div className="px-4 py-3 prescription-card" key={key}>
                                    <div className="grid">
                                        <Tablet size={30} />
                                        <div className="date">
                                            <p className="title">Paracetamol</p>
                                            <p className="gray-text font-size-16 line-height-20 mb-2">1 capsule, 3 times a day, for {prescription?.duration}</p>
                                            <p className="gray-text font-size-16 line-height-20 mb-2">
                                                Start Date: {" "}
                                                <span>{dayjs(prescription?.startDate).format("MMM DD, YYYY")}</span>
                                            </p>
                                            <span className="light-navy-blue-text font-size-14 line-height-18 font-weight-500">Notes: Take 30 minutes before a meal</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    ) : (
                        <p>There are no prescriptions for this patient yet.</p>
                    )}
                </Prescription>
                <ClinicalNotes>
                    <h2>Clinical notes</h2>
           
                    <NotesCard>
                        {notes?.records?.length > 0 ? (
                            <React.Fragment>
                                {notes?.records.map((note: any, key: number) => (
                                <div className="card px-4 py-3" key={key}>
                                    <div className="d-flex justify-content-between">
                                        <StyledBadge>
                                            <span>Doctor Notes</span>
                                        </StyledBadge>
                                        <span className="date">{dayjs(new Date()).format("MMM DD, YYYY")}</span>
                                    </div>
                                    <div>
                                        <p className="navy-blue-text line-height-20 font-weight-500 mb-2">Complaints</p>
                                        <p className="detail">{note?.complaints}</p>
                                    </div>

                                    <div>
                                        <p className="navy-blue-text line-height-20 font-weight-500 mb-2">Observations</p>
                                        <p className="detail">{note?.observations}</p>
                                    </div>

                                    <div>
                                        <p className="navy-blue-text line-height-20 font-weight-500 mb-2">Diagnosis</p>
                                        <p className="detail">{note?.diagnosis}</p>
                                    </div>
                                </div>
                            ))}
                            </React.Fragment>
                        ): (
                            <p>There are no notes for this patient yet</p>
                        )}
                    </NotesCard>
                </ClinicalNotes>
                <Treatment>
                   <h2>Treatments</h2>

                    {plans?.records?.length > 0 ? (
                        <React.Fragment>
                            {plans?.records?.map((plan: any, key: number) => (
                                <div className="px-4 py-3 treatment-card" key={key}>
                                    <div>
                                        <p className="navy-blue-text font-size-16 font-weight-500 line-height-20 mb-2">{dayjs(plan?.created_at).format("MMM DD, YYYY")}</p>
                                        <p className="gray-text font-size-16 font-weight-400 line-height-20">
                                            {plan?.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    ) : (
                        <p>There are no treatment plans for this patient yet.</p>
                    )}

                </Treatment>
            </Grid>
            )}
            </HeadMeta>
        </Layout>
     );
}


const Grid = styled.div`
    display: grid;
    width: 100%;
    gap: 32px;
    background-color: var(--off-white);
    grid-template-columns: 350px 720px 350px;
`

const Prescription = styled.div`
    h2 {
        font-weight: bold;
        font-size: 22px;
        line-height: 30px;
        color: var(--default);
    }
    .prescription-card {
        border-radius: 14px;
        margin-bottom: 16px;
        width: 100%;
        background-color: #fff;
    }

    .grid {
        display: flex;
        gap: 16px;
    }

    .title {
        font-weight: 500;
        font-size: 18px;
        line-height: 23px;
    }
`

const ProfileCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #fff;
    border-radius: 18px;
    padding: 24px;
    margin-bottom: 40px;

    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 16px;
        margin-bottom: 14px;
        object-position: center;
    }
`;

const ClinicalNotes = styled.div`
    h2{
        font-weight: bold;
        font-size: 22px;
        line-height: 30px;
        color: var(--default);
    }
`;

const NotesCard = styled.div`
    display: flex;
    flex-wrap: wrap;
    grid-gap: 16px;
    justify-content: space-between;

    .card {
        border-radius: 14px;
        border: none;
        width: 100%;
        max-width: 350px;
        background-color: #fff;
    }

    .date {
        color: var(--gray);
        font-size: 14px;
        line-height: 30px;
    }

    .detail {
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: var(--gray);
    }
`;

const StyledBadge = styled(Badge)`
  padding: 0px 8px;
  border-radius: 12px;
  background-color: rgba(231,61,142, 0.1) !important;
  margin-bottom: 1rem;
  
  span {
    color: var(--pink);
    font-weight: 500;
    font-size: 14px;
    line-height: 30px;
  }
`;

const Treatment = styled.div`
  .treatment-card {
    border-radius: 14px;
    margin-bottom: 16px;
    background-color: #fff;
  }

   h2{
        font-weight: bold;
        font-size: 22px;
        line-height: 30px;
        color: var(--default);
    }
`;
 
export default DetailsPage;