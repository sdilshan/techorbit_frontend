import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext, clearSession, getSession } from "../common/session";

export const useLogout = () => {
  const { setUserAuth } = useContext(SessionContext);
  const navigate = useNavigate();

  return () => {
    clearSession();
    setUserAuth(getSession());
    navigate("/signin");
  };
};