const auth = (state: any, action: any) => {
  switch (action.type) {
    case "ACTION_START":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      const { doctor, admin, token } = action.payload;
      const userInfo = {
        doctor,
        admin,
      };
      return {
        ...state,
        userDetails: userInfo,
        token,
        loading: false,
        errorMessage: "",
      };
    case "FORGOT_PASS":
      return {
        ...state,
        loading: false,
        OTPContact: action.payload,
        OTPTimer: Date.now(),
      };
    case "VERIFY_OTP":
      return {
        ...state,
        userID: action.payload.user_id,
        loading: false,
      };
    case "CLEAR_OTP_INFO":
      return {
        ...state,
        userID: "",
        OTPContact: "",
        OTPTimer: "",
        loading: false,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        loading: false,
        userDetails: "",
        token: "",
        errorMessage: "",
      };
    case "ACTION_ERROR":
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        errorMessage: "",
      };
    default:
      return state;
  }
};

export default auth;
