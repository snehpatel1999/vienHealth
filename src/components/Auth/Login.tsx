import * as React from 'react';
import { useHistory, useLocation, Redirect } from "react-router";
import { Form } from "react-bootstrap";
import { Formik, FormikHelpers, FormikProps } from "formik";
import { object, string } from "yup";


import { loginService } from '../../services/authService';
import { useAuth } from "../../context/authProvider";
import { namedRoutes } from '../../Routes';
import Button from "../Button";
import Field from "../Field";
import Auth from "./Auth";
import HeadMeta from '../Layout/HeadMeta';


interface Values {
  email: string;
  password: string;
}


export interface LocationParams {
  pathname: string;
  search: string;
  hash: string;
  key: string;
}


interface StateType {
   from: { pathname: string }
}


const Login: React.FC<{}> = () => {

  let history = useHistory();
  let { state } = useLocation<StateType>();
  const { signin, user } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let { from } = state || { from: { pathname: "/" } };


  if (user?.userInfo) {
    return <Redirect to={namedRoutes.dashboard.index} />
  }
 
  return (
    <Auth>
      <HeadMeta title="Login - Holistic Health"
        description="Africa's Leading Virtual Healthcare - Holistic Health"
      >        
      <div>
        <h1 className="font-weight-600 font-size-38 default-text mb-2">Welcome Back!</h1>
        <p className="gray-text mb-24">
          Please sign in to your Vien Health account
        </p>
      </div>

      <Formik
        validateOnMount
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        children={(props) => <LoginForm {...props} />}
        onSubmit={(params: Values, { setSubmitting, setErrors }: FormikHelpers<Values>) => {
            loginService(params).then((response) => {
                signin(response.data)
                history.push(namedRoutes.dashboard.index)
            }).catch((error) => {
                setErrors({ email: error?.response?.data?.error || "Credentials do not exist" }) 
                setSubmitting(false)
            })
        }}
      />
      </HeadMeta>
    </Auth>
  );
}

const LoginSchema = object({
  email: string().required("This field is required"),
  password: string().required("This field is required"),
});


/**
 *
 * @param {*} param0
 * @returns
 */

const LoginForm = (props: FormikProps<Values>) => {
  const { email, password } = props.values;
  
  return (
    <Form>
      <Field
        type="text"
        name="email"
        value={email}
        placeholder="Email/Phone number"
      />
      <Field
        type="password"
        name="password"
        placeholder="••••••••"
        value={password}
      />

      <Form.Group className="d-flex align-items-center justify-content-between mb-40">
        <Form.Check
          type="checkbox"
          id="remember-me"
          label={<span>Remember me</span>}
        //    custom="true"
        />
        <a href="/forgotten" className="font-weight-500 font-size-16 line-height-20 pink-text text-decoration-none">
          Forgot password?
        </a>
      </Form.Group>

      <Form.Group>
        <Button
            type="submit"
            className="btn--default btn-60 w-100 px-32 font-size-20 font-weight-500"
            isValid={props.isValid}
            loading={props.isSubmitting}
            onClick={props.handleSubmit}
        >
          Sign in
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Login;
