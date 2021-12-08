/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, Fragment, FC, createRef } from 'react';
import { useParams } from 'react-router';
import { Form, Badge } from 'react-bootstrap';
import { Formik } from 'formik';
import { object, string, array } from "yup";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import useSWR from 'swr'
import dayjs from 'dayjs'

import Clipboard from '../Icons/Clipboard';
import Tablet from "../Icons/Tablet"
import EmptyState from './EmptyState';
import Select from "../Select"
import Button from '../Button';
import Field from "../Field";
import Modal from '../Modal';
import Close from '../Icons/Close';
import { daysOfTheWeek, dosages, durations, frequencies } from './data'
import { addPrescription } from '../../services/appointmentService';


// schema
const PrescriptionSchema = object({
  drug_name: string().required("Drug name is required"),
  drug_type: string(),
  notes: string(),
  frequency: string().required("This field is required"),
  days: array().min(1).required("Days is required"),
  taken_per_time: string().required("This field is required"),
  duration: string().required("This field is required"),
});


export interface PrescriptionsProps {
    ref?: React.ForwardedRef<HTMLInputElement>;
    prescription: any;
}

 
const Prescriptions: FC<PrescriptionsProps> = ({ prescription }) => {
    /**
   * variables
   */
    const parsed: any = useParams()  

    const [modal, showModal] = useState(false) 
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const ref = createRef<HTMLInputElement>();

    const { data: drugs } = useSWR('/api/doctor/drug/all')
   
    const availableDrugs = drugs?.drugs || []

   // console.log(prescription);
    

    /**
     * functions
     * @param params f
     * @param param1 
     */
    const handleSubmit = (params: any, { setSubmitting }: any) => {        
        addPrescription({...params, 
            appointment_id: parsed?.id ,  
            startDate: dayjs(startDate).format(), 
            endDate: dayjs(endDate).format(), 
            type: "create"
        })
        .then(() => {
            toast.success("Prescription has been added successfully")
            showModal(false)
        })
        .catch((error) => toast.error(error?.response?.data?.error || "Unable to add prescription, please try again"))
        .finally(() =>{ 
            setSubmitting(false)
            showModal(false)
        })
    }


    return ( 
        <Fragment>
            {prescription?.length > 0 ? (
                <div>

                    {prescription.map((prescription: any, key: number) => (
                        <Card className="m-4 px-4 py-3" key={key}>
                            <Grid>
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
                            </Grid>
                        </Card>
                    ))}
                    <Button 
                    isValid 
                    onClick={() => showModal(true)} 
                    className="btn--default btn-60 w-75 mx-auto"
                    >
                        Add prescription
                    </Button>
                </div>
            ) : (
                <EmptyState 
                icon={<Clipboard size={40} className="mb-4" />}
                value="Add prescription"
                title="No prescription yet" 
                onClick={() =>showModal(true)}
                description="Start adding a prescription for your patient." />
            )}


            <ModalWrapper show={modal} onHide={() => showModal(false)} className="px-4" fullscreen>
                <Header>New Prescription</Header>

                <Formik 
                initialValues={{drug_name: "", drug_type: "", notes: "", frequency: "", days: [], taken_per_time: "", duration: ""}} 
                validationSchema={PrescriptionSchema}
                onSubmit={handleSubmit}>
                {({isSubmitting, isValid, handleSubmit, setFieldValue, errors, touched,  values: { drug_name, drug_type, notes, frequency, days, taken_per_time, duration }}) => (
                    <Form>
                        <Field
                            type="text"
                            name="drug_name"
                            value={drug_name}
                            placeholder="Name of drug"
                        />
                        {errors?.drug_name && touched?.drug_name && (
                            <small className="line-height-15 danger-text pl-3">
                            {errors?.drug_name}
                            </small>
                        )}

                        <Select 
                            placeholder="Drug type"
                            value={drug_type}
                            name="drug_type"
                            options={
                                availableDrugs?.map(({ name: value, name: label }: any) => ({
                                        value,
                                        label,
                                    })) || []
                            } 
                            onChange={({ value }: any) => setFieldValue("drug_type", value)}
                        />
                        {errors?.drug_type && touched?.drug_type && (
                            <small className="line-height-15 danger-text pl-3">
                            {errors?.drug_type}
                            </small>
                        )}

                        <Select 
                            placeholder="Dosage"
                            name="taken_per_time"
                            value={taken_per_time}
                            options={
                                dosages?.map(({ name: value, name: label }: any) => ({
                                    value,
                                    label,
                                })) || []
                            } 
                            onChange={({value}: any) => setFieldValue("taken_per_time", value)}
                        />
                        {errors?.taken_per_time && touched?.taken_per_time && (
                            <small className="line-height-15 danger-text pl-3">
                            {errors?.taken_per_time}
                            </small>
                        )}

                       <Select 
                            placeholder="Frequency"
                            value={frequency}
                            name="frequency"
                            options={
                                frequencies.map(({ name: value, name: label }: any) => ({
                                    value,
                                    label,
                                })) || []
                            } 
                            onChange={({value}: any) => setFieldValue("frequency", value)}
                        />
                        {errors?.frequency && touched?.frequency && (
                            <small className="line-height-15 danger-text pl-3">
                            {errors?.frequency}
                            </small>
                        )}

                        <Select 
                            placeholder="Duration"
                            value={duration}
                            name="duration"
                            options={
                                durations?.map(({ name: value, name: label }: any) => ({
                                    value,
                                    label,
                                })) || []
                            } 
                            onChange={({value}: any) => setFieldValue("duration", value)}
                        />
                        {errors?.duration && touched?.duration && (
                            <small className="line-height-15 danger-text pl-3">
                            {errors?.duration}
                            </small>
                        )}

                        <Select 
                            placeholder="Days of the week"
                            name="days"
                            value={days}
                            isMulti={true}
                            options={
                                daysOfTheWeek?.map(({ id: value, name: label }) => ({
                                        value,
                                        label,
                                    })) || []
                            } 
                            onChange={(value: any) => setFieldValue("days", value.map(({label}: any) => label || []))}
                        />
                        {errors?.days && touched?.days && (
                            <small className="line-height-15 danger-text pl-3">
                            {errors?.days}
                            </small>
                        )}

                        <Form.Group>
                            <Form.Label>Start date</Form.Label>
                            <DatePickerDiv>
                                <DatePicker
                                    selected={startDate}
                                    dateFormat="MM/dd/yyyy"
                                    className="form-control"
                                    onChange={(date: Date) => {
                                    setStartDate(date);
                                    }}
                                    // customInput={<CustomInput />}
                                />
                            </DatePickerDiv>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>End date</Form.Label>
                            <DatePickerDiv>
                                <DatePicker
                                    selected={endDate}
                                    dateFormat="MM/dd/yyyy"
                                    className="form-control"
                                    onChange={(date: Date) => {
                                    setEndDate(date);
                                    }}
                                    // customInput={<CustomInput />}
                                />
                            </DatePickerDiv>

                        </Form.Group>

                        <Field
                            type="text"
                            name="notes"
                            value={notes}
                            placeholder="Notes"
                        />

                        <div className="mt-3">
                            <Button 
                            isValid={isValid} 
                            onClick={handleSubmit} 
                            loading={isSubmitting}
                            className="btn--default btn-60 w-75 mt-3 mx-auto"
                            >
                                Save prescription
                            </Button>
                        </div>
                    </Form>
                    )}
                </Formik>
            </ModalWrapper>
        </Fragment>
     );
}


// custom input 
 const CustomInput = React.forwardRef<HTMLInputElement>((props, ref) => {
    return (
      <Form.Group>
        <Form.Control />
        <Close size={16} />
      </Form.Group>
    );
  });


/**
 * styles
 */

const ModalWrapper = styled(Modal)`
    .form-control {
        margin-bottom: 24px !important;
    }

    label {
        font-weight: 400;
        font-size: 18px;
        line-height: 30px;
        color: var(--navy-blue);
    }

    .form-select {
        &::placeholder {
            color: var(--default) !important;
            opacity: 0.7;
        }
    }
`;

const Header = styled.h4`
    font-size: 22px;
    margin-top: 16px;
    line-height: 30px;
    margin-bottom: 40px;
    color: var(--dark-navy);
`;

const DatePickerDiv = styled.div`
    display: flex; 
    position: relative;
`;

const CustomDatePickDiv = styled.div`
  background-color: white;
  border: solid 0.1em #cbd4c9;
  border-radius: 0.25em;
  padding: 0.3em 1.6em 0 1.6em;
`;


const Wrapper = styled.div`
    
`;

/**
 * styles
 */


const StyledBadge = styled(Badge)`
  padding: 0px 8px;
  border-radius: 12px;
  background-color: rgba(231,61,142, 0.1);
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
`;


const Grid = styled.div`
    display: flex;
    gap: 16px;

    .title {
        font-weight: 500;
        font-size: 18px;
        line-height: 23px;
    }
`
 
 
export default Prescriptions;