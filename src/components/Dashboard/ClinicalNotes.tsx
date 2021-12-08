import React, { useState, Fragment } from 'react';
import { useParams } from 'react-router';
import { Badge, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import styled from "styled-components";
import dayjs from 'dayjs'
import { object, string } from "yup";

import EmptyState from './EmptyState';
import Copy from '../Icons/Copy';
import Button from '../Button';
import Modal from '../Modal';
import { addClinicalNotes } from '../../services/appointmentService';


// schema
const NotesSchema = object({
  complaints: string(),
  observations: string().required("This field is required"),
  diagnosis: string().required("This field is required"),
});

const ClinicalNotes = ({ notes }: any) => {
/**
 * state
 */
    const parsed: any = useParams() 
    const [modal, showModal] = useState(false);

/**
 * functions
 */


    const handleSubmit = (params: any, { setSubmitting }: any) => {   
        addClinicalNotes({
            ...params, 
            appointment_id: parsed?.id,
            type: "create"
        })
        .then(() => toast.success("Notes has been added successfully"))
        .catch((error) => toast.error(error?.response?.data?.error || "Unable to add notes, please try again"))
        .finally(() => {
            setSubmitting(false)
            showModal(false)
        })
    }
    

    return ( 
        <Fragment>
            {notes?.length > 0 ? (
                <div>

                {notes.map((note: any, key: number) => (
                    <Card className="m-4 px-4 py-3" key={key}>
                        <div className="d-flex justify-content-between">
                            <StyledBadge>
                                <span>Doctor Notes</span>
                            </StyledBadge>
                            <span className="date">{dayjs(notes?.created_at).format("MMM DD, YYYY")}</span>
                        </div>

                        <Fragment>
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
                        </Fragment>
                    </Card>
                ))}
                    <Button 
                    isValid 
                    onClick={() => showModal(true)} 
                    className="btn--default btn-60 w-75 mx-auto"
                    >
                        Add Notes
                    </Button>
                </div>
            ) : (
                <EmptyState 
                icon={<Copy size={40} className="mb-4"/>}
                value="Add Notes"
                title="No clinical notes yet" 
                description="Start adding clinical notes for your patient."
                onClick={() => showModal(true)}
                />
            )}

            <Modal show={modal} onHide={() => showModal(false)} className="px-4" fullscreen>
                <Header>New Note</Header>

                <Formik 
                initialValues={{ diagnosis: "", observations: "", complaints: ""}} 
                validationSchema={NotesSchema}
                onSubmit={handleSubmit}>
                    {({isSubmitting, isValid, handleChange, handleSubmit, errors, touched}) => (
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Control
                            as="textarea"
                            name="complaints"
                            placeholder="Complaints"
                            onChange={handleChange}
                            style={{ height: '150px', padding: 24 }}
                            />
                            {errors?.complaints && touched?.complaints && (
                                <small className="line-height-15 danger-text pl-3">
                                {errors?.complaints}
                                </small>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Control
                            as="textarea"
                            name="observations"
                            onChange={handleChange}
                            placeholder="Observations"
                            style={{ height: '150px', padding: 24 }}
                            />
                            {errors?.observations && touched?.observations && (
                                <small className="line-height-15 danger-text pl-3">
                                {errors?.observations}
                                </small>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Control
                            as="textarea"
                            name="diagnosis"
                            onChange={handleChange}
                            placeholder="Diagnosis"
                           style={{ height: '150px', padding: 24 }}
                            />
                            {errors?.diagnosis && touched?.diagnosis && (
                                <small className="line-height-15 danger-text pl-3">
                                {errors?.diagnosis}
                                </small>
                            )}
                        </Form.Group>

                        <div className="mt-3">
                            <Button 
                            type="submit"
                            isValid={isValid} 
                            loading={isSubmitting}
                            onClick={handleSubmit} 
                            className="btn--default btn-60 w-75 mx-auto"
                            >
                                Save Note
                            </Button>
                        </div>
                    </Form>
                    )}
                </Formik>
            </Modal>
        </Fragment>
    );
}

/**
 * styles
 */

const Header = styled.h4`
    font-size: 22px;
    margin-top: 16px;
    line-height: 30px;
    margin-bottom: 40px;
    color: var(--dark-navy);
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

const Card = styled.div`
    border-radius: 14px;
    margin-bottom: 40px;
    background-color: #fff;

    .date {
        color: var(--gray);
        font-size: 14px;
        line-height: 30px;
    }

    .detail {
        font-weight: 300;
        font-size: 16px;
        line-height: 22px;
        color: var(--gray);
    }
`;
 
export default ClinicalNotes;