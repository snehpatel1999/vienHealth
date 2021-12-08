import { Http } from "../utils";

export const getDoctorsPatients= (payload: string) => Http.post(`/api/doctor/myPatients`, payload);

export const addClinicalNotes = (payload: object) =>  Http.post(`/api/doctor//notes/create`, payload);

export const addPrescription = (payload: object) =>  Http.post(`/api/doctor/prescription/create`, payload);

export const addTreatmentPlan = (payload: object) =>  Http.post(`/api/doctor/treatment-plan/create`, payload);

export const generateToken = (payload: object) =>  Http.post(`/api/doctor/twilio/access/token/generate`, payload);