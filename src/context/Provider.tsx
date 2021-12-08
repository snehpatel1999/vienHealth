import { createContext, useReducer } from "react";
import auth from "./reducers/auth";
import authInitialState from "./initialStates/auth";

export const GlobalContext = createContext<any>({});

export const GlobalProvider = ({ children }: { children: any }) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState);

  return (
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
