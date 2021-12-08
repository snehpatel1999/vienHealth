import SignIn from "../components/Auth/SignIn";
import ForgotPassword from "../components/Auth/ForgotPassword";
import OTPVerify from "../components/Auth/OTPVerify";
import ResetPassword from "../components/Auth/ResetPassword";
import "../App.less";
import Profile from "../components/Dashboard/Profile";

const routes = [
  {
    path: "/sign-in",
    component: SignIn,
    title: "Sign In",
    needsAuth: false,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    title: "Forgot Paswword",
    needsAuth: false,
  },
  {
    path: "/verify-otp",
    component: OTPVerify,
    title: "Verify OTP",
    needsAuth: false,
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    title: "Reset Password",
    needsAuth: false,
  },
  {
    path: "/profile",
    component: Profile,
    title: "Profile Page",
    needsAuth: false,
  },
];

export default routes;
