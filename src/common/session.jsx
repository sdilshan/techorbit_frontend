import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const SessionContext = createContext();

export const storeSession = (accessToken, user) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

export const getSession = () => ({
  accessToken: localStorage.getItem("accessToken"),
  user: JSON.parse(localStorage.getItem("user")),
});

const SessionProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(getSession);

  return (
    <SessionContext.Provider
      value={{
        userAuth,
        setUserAuth,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

SessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SessionProvider;