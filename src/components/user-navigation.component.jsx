import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AnimationWrapper from "../common/page-animation";
import {useLogout} from "../hooks/useLogout";
const UserNavigationPanel = ({ username}) => {
  const logout = useLogout();



  return (
    <AnimationWrapper 
    transition={{ duration: 0.2 }}
    className="absolute right-0 z-50">
      <div className="absolute right-0 top-1 w-64 bg-white border border-grey rounded-lg shadow-lg  duration-200">
        <Link
          to={`/user/${username}`}
          className="flex gap-2 link md:hidden pl-8 py-4"
        >
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>
        <Link to={`/user/${username}`} className="link pl-8 py-4">
          Profile
        </Link>
        <Link to="/dashboard/blogs" className="link pl-8 py-4">Dashboard</Link>
        <Link to="/settings/edit-profile" className="link pl-8 py-4">Setting</Link>
        <span className="absolute border-t border-grey w-[100%] "></span>
              <div className="px-8 py-4">
          <p className="text-sm text-dark-grey">
            @{username}
          </p>

          <button
            onClick={logout}
            className="flex items-center justify-between w-full mt-3 text-left hover:text-red"
          >
            <span>Sign Out</span>

            <i className="fi fi-rr-sign-out-alt text-lg"></i>
          </button>
        </div>
      </div>
    </AnimationWrapper>
  );
};
UserNavigationPanel.propTypes = {
  username: PropTypes.string.isRequired,
};

export default UserNavigationPanel;
