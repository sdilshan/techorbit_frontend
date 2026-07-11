import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../common/session";

const PublicRoute = ({ children }) => {
  const { userAuth } = useContext(SessionContext);

  if (userAuth.accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;