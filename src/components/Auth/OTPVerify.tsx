import * as React from 'react';
import OtpInput from 'react-otp-input';
import styled from "styled-components";
import { Formik, FormikHelpers } from "formik";
import { Form } from "react-bootstrap";
import { object, string } from "yup";


import Button from '../Button';


interface Values {
  token: string;
}

const RESEND_OTP_TIME_LIMIT = 60;
let resendOtpTimerInterval: NodeJS.Timeout;


const OtpSection = (props: any) => {
   const [resendButtonDisabledTime, setResendButtonDisabledTime] = React.useState(
    RESEND_OTP_TIME_LIMIT,
  );


  const startResendOtpTimer = React.useCallback(() => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  }, [resendButtonDisabledTime]);


  React.useEffect(() => {
    startResendOtpTimer();
    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime, startResendOtpTimer]);


  return(
    <React.Fragment>
       <div>
        <h1 className="font-weight-600 font-size-38 default-text mb-2">OTP Verification</h1>
        <p className="font-weight-500 gray-text mb-24">
          Please enter the OTP sent to you mobile number <br />
          +233 (24)  450 - 4587
        </p>
      </div>

      <Formik
        initialValues={{ token: ""}}
        validationSchema={object({
          token: string().required("This field is required"),
        })}
        onSubmit={(params: Values, { setSubmitting, setErrors }: FormikHelpers<Values>) => {
          console.log(params);
        }}
      >
        {({isSubmitting, setFieldValue, isValid, handleSubmit, errors, values: {token}}) => (
          <Form>
            <StyledOTP
              isInputNum
              shouldAutoFocus
              value={token}
              numInputs={6}
              hasErrored={!!errors.token}
              errorStyle="border-danger"
              inputStyle="form-control w-100 mx-2"
              containerStyle={errors.token && "mb-2"}
              onChange={(value: string) => setFieldValue("token", value)}
            />

            <p className="line-height-20 danger-text pl-3 mb-3">
              {errors?.token}
            </p>
    

            <p className="font-weight-300 gray-text text-center cursor-pointer">
              Resend verification code {" "}
              <span className="default-text font-weight-600">{`00:${resendButtonDisabledTime < 10 ? `0${resendButtonDisabledTime}` : resendButtonDisabledTime}`}</span>
            </p>

            <Form.Group>
              <Button
                  type="submit"
                  className="btn--default btn-60 w-100 px-32 font-size-20 font-weight-500 mt-40"
                  isValid={isValid}
                  loading={isSubmitting}
                  onClick={handleSubmit}
              >
                Verify
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>

      
    </React.Fragment>
  )
}



const StyledOTP = styled(OtpInput)`
  display: flex;
  .form-control {
    font-size: 32px;
    line-height: 45px;
    font-weight: 600;
    color: var(--default);
    padding: 0px !important;
  }
  @media (min-width: 768px) {
    .form-control {
      padding: 0px 20px;
    }
  }
`;


export default OtpSection
