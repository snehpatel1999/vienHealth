import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import cookie from "../utils/cookie";

const AuthContext = createContext<any>({});

const localStorageKey = "__auth_doctors__token";

function AuthProvider(props: any) {
  const userInfo = localStorage.getItem(localStorageKey);

  const [user, setUser] = useState({
    userInfo: userInfo ? JSON.parse(userInfo) : null,
  });

  const signin = useCallback(( data ) => {
    localStorage.setItem(localStorageKey, JSON.stringify(data?.doctor));
    cookie().setCookie("token", data.token)
    setUser({ userInfo: data?.doctor });
  }, []);

  const signout = useCallback((cb) => {
    localStorage.clear();
    cookie().deleteCookie("token");
    setUser({ userInfo: null });
    cb();
  }, []);

  const value = useMemo(() => ({ user, signin, signout }), [
    user,
    signin,
    signout,
  ]);

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (typeof context === undefined) {
    throw new Error(`useAuth must be used within a Provider`);
  }

  return context;
}

export { useAuth, AuthProvider };