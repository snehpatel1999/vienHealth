const userJSON = localStorage.getItem("currentUser");
const accessToken = localStorage.getItem("userToken");

const user = userJSON !== null ? JSON.parse(userJSON) : "";
const token = accessToken !== null ? JSON.parse(accessToken) : "";

interface AuthState {
  userDetails: string;
  token: string;
  OTPContact: string;
  OTPTimer: string;
  userID: string;
  loading: boolean;
  errorMessage: string;
}

const initialState: AuthState = {
  userDetails: user,
  token: token,
  OTPContact: "",
  OTPTimer: "",
  userID: "",
  loading: false,
  errorMessage: "",
};

export default initialState;
