import logo from "../imgs/logo.png";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useContext, useEffect, useRef } from "react";
import { SessionContext } from "../common/session";
import UserNavigationPanel from "../components/user-navigation.component";
const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const { userAuth } = useContext(SessionContext);
  const [showUserNav, setShowUserNav] = useState(false);
  const userNavRef = useRef(null);
  const { accessToken, user } = userAuth;

  const { fullname, username, profile_img } = user || {};
  useEffect(() => {
    setShowUserNav(false);
  }, [accessToken]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userNavRef.current && !userNavRef.current.contains(event.target)) {
        setTimeout(() => {
          setShowUserNav(false);
        }, 200);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} className="w-full" />
        </Link>
        <div
          className={
            "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey " +
            "py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
            (searchBoxVisibility ? "show" : "hide")
          }
        >
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
          />
          <i
            className="fi fi-br-search absolute right-[10%]
            md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl"
          ></i>
        </div>
        <div className="flex items-center gap-3 md:gap-6 ml-auto ">
          <button
            className=" md:hidden bg-grey w-12 h-12 rounded-full
        flex items-center justify-center"
            onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}
          >
            <i className="fi fi-br-search text-xl"></i>
          </button>
          <Link to="/editor" className="hidden md:flex gap-2 link">
            <i className="fi fi-rr-file-edit"></i>
            <p>Write</p>
          </Link>

          {accessToken ? (
            <>
              <Link to="/dashboard/notification">
                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                  <i className="fi fi-rr-bell text-2xl block mt-1"></i>
                </button>
              </Link>
              <div className="relative" ref={userNavRef}>
                <button
                  onClick={() => setShowUserNav((prev) => !prev)}
                  className="w-10 h-10"
                >
                  <img
                    src={profile_img}
                    alt={fullname}
                    className="w-full h-full rounded-full object-cover"
                  />
                </button>

                {showUserNav && (
                  <UserNavigationPanel
                    username={username}
                    closePanel={() => setShowUserNav(false)}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <Link className="btn-dark py-2" to="/signin">
                Sign In
              </Link>

              <Link className="btn-light py-2 hidden md:block" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default Navbar;
