import { FC, useState, Fragment } from "react";
import { Formik, FormikHelpers } from "formik";
import { Form } from "react-bootstrap";
import { object, string } from "yup";


import { forgotPasswordService } from "../../services/authService";
import OtpSection from "./OTPVerify";
import Button  from "../Button";
import  Field  from "../Field";
import Auth from "./Auth";
import HeadMeta from "../Layout/HeadMeta";


const ForgotPassword: FC = () => {
  const [section ,setSection] = useState<string>("email");
 
  return (
    <Auth>
      {section === "email" && <VerifyUser {...{setSection}} />}

      {section === "otp" && <OtpSection/>}
    </Auth>
  );
};


interface Values {
  email: string;
}


/**
 * other compoenents
 */

type Props = {
  setSection: (value: string) => void
}

const VerifyUser = ({ setSection }: Props) => {
  return(
    <Fragment>
      <HeadMeta title="Forgot Password - Holistic Health"
        description="Forgot your password - Holistic Health">
      <div>
        <h1 className="font-weight-600 font-size-38 default-text mb-2">Forgot your password?</h1>
        <p className="gray-text mb-40">
          Please enter the email or phone number associated with your account to receive a reset link.
        </p>
      </div>

      <Formik
        initialValues={{ email: ""}}
        validationSchema={object({
          email: string().required("This field is required"),
        })}
        onSubmit={(params: Values, { setSubmitting, setErrors }: FormikHelpers<Values>) => {
          forgotPasswordService(params).then(() => setSection("otp")
          ).catch((error) => {
            setErrors({ email: error?.response?.data?.error || "This email is not attached to any current account."})
          }).finally(() => setSubmitting(false))
        }}
      >
        {({isSubmitting, isValid, handleSubmit, values: {email}}) => (
          <Form className="mt-40">
            <Field
              type="text"
              name="email"
              value={email}
              placeholder="Email/Phone number"
            />

            <Form.Group>
              <Button
                  type="submit"
                  className="btn--default btn-60 w-100 px-32 font-size-20 font-weight-500 mt-40"
                  isValid={isValid}
                  loading={isSubmitting}
                  onClick={handleSubmit}
              >
                Send
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
      </HeadMeta>
    </Fragment>
  )
}


export default ForgotPassword;
