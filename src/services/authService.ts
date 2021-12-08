import axios from "axios";
import { Http } from "../utils";


const { REACT_APP_BASE_URL } = process.env;

interface IPayload {
  body: {};
}

export const loginService = (payload: object) => Http.post(`/api/doctor/login`, payload);

export const forgotPasswordService = ( payload : object) => Http.post(`/api/doctor/forgot-password`, payload);

export const verifyOTPService = async ({ body }: IPayload) => {
  const { data } = await axios.post(
    `${REACT_APP_BASE_URL}/api/doctor/verify-password`,
    body,

  );

  return data;
};

export const resetPasswordService = async ({ body }: any) => {
  const { data } = await axios.post(
    `${REACT_APP_BASE_URL}/api/doctor/change-password`,
    body,

  );

  return data;
};

export const logoutService = async ({ body }: any) => {
  await axios.post(`${REACT_APP_BASE_URL}/api/doctor/logout`, body);
};
