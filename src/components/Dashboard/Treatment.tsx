import  React, { useState , Fragment} from 'react';
import styled from "styled-components";
import { useParams } from 'react-router';
import dayjs from 'dayjs'
import {  Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import { object, string } from "yup";

import Pills from '../Icons/Pills';
import Modal from '../Modal';
import Button from '../Button';
import EmptyState from './EmptyState';
import { addTreatmentPlan } from '../../services/appointmentService';


// schema
const TreatmentSchema = object({
  text: string().required("This field is required"),
});

export interface TreatmentProps {
    
}
 
const Treatment: React.FC<TreatmentProps> = ({ treatments }: any) => {
      /**
   * variables
   */
    const parsed: any = useParams()  
    const [modal, showModal] = useState(false)


    /**
     * functions
     * @param params 
     * @param param1 
     */
    const handleSubmit = (params: any, { setSubmitting }: any) => {    
        addTreatmentPlan({...params, 
            appointment_id: parsed?.id ,
            plan_id: "",
            type: "create"
        }).then(() => {
            showModal(false)
            toast.success("Treatment Plan has been added successfully")
        }).catch((error) => toast.error(error?.response?.data?.error || "Unable to add plan, please try again"))
        .finally(() =>{ 
            setSubmitting(false)
            showModal(false)
        })
    }


    return ( 
        <Fragment>
            {treatments?.length > 0 ? (
                 <div>
                    {treatments.map((note: any, key: number) => (
                        <Card className="m-4 px-4 py-3" key={key}>
                            <div>
                                <p className="navy-blue-text font-size-16 font-weight-500 line-height-20 mb-2">{dayjs(Date.now()).format("MMM DD, YYYY")}</p>
                                <p className="gray-text font-size-16 font-weight-300 line-height-20">Lorem ipsum dolor sit amet, consecteturd ising elit. 
                                Vestibulum suscipit laoreet Lorem ipsum lor sit amet, consectetur adipiscing elit. Vstibulum suscipit laoreet
                                </p>
                            </div>
                        </Card>
                    ))}
                    <Button 
                    isValid 
                    onClick={() => showModal(true)} 
                    className="btn--default btn-60 w-75 mx-auto"
                    >
                        Add Treatment
                    </Button>
                </div>
            ) : (
            <div>
                <EmptyState 
                icon={<Pills size={40} className="mb-4" />}
                value="Add Treatment"
                title="No Treatments yet" 
                onClick={() =>showModal(true)}
                description="Start adding a treatment plan for your patient."
                />

                <Modal show={modal} onHide={() => showModal(false)} fullscreen>
                    <Header>New Treatment</Header>

                    <Formik 
                    initialValues={{ text: ""}} 
                    validationSchema={TreatmentSchema}
                    onSubmit={handleSubmit}
                    >
                    {({isSubmitting, isValid, handleChange, handleSubmit, errors, touched }) => (
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Control
                            name="text"
                            as="textarea"
                            placeholder="Treatment plan"
                            onChange={handleChange}
                            style={{ height: '150px', padding: 24 }}
                            />
                            {errors?.text && touched?.text && (
                                <small className="line-height-15 danger-text pl-3">
                                {errors?.text}
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
                                Save Treatment
                            </Button>
                        </div>
                    </Form>
                    )}
                </Formik>
                </Modal>
            </div>

            )}
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


const Card = styled.div`
    border-radius: 14px;
    margin-bottom: 40px;
    background-color: #fff;
`;

 
export default Treatment;