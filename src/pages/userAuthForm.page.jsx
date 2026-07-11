import PropTypes from "prop-types";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { useState } from "react";
import { signin ,signup} from "../services/authService";
import { useContext } from "react";
import { SessionContext, storeSession ,getSession} from "../common/session";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const UserAuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };
const { setUserAuth } = useContext(SessionContext);

const navigate = useNavigate();
 const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  // Full name validation (Sign Up only)
  if (type === "sign-up") {
    if (!formData.fullname.trim()) {
      newErrors.fullname = "Please enter your full name.";
    } else if (formData.fullname.trim().length < 3) {
      newErrors.fullname =
        "Full name must be at least 3 characters long.";
    }
  }

  // Email validation
  if (!formData.email.trim()) {
    newErrors.email = "Please enter your email address.";
  } else if (
    !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
  ) {
    newErrors.email = "Please enter a valid email address.";
  }

  // Password validation
  if (!formData.password) {
    newErrors.password = "Please enter your password.";
  } else if (type === "sign-up") {
    if (formData.password.length < 6 || formData.password.length > 20) {
      newErrors.password =
        "Password must be between 6 and 20 characters long.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter.";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one number.";
    }
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) return;

try {
  const response =
    type === "sign-up"
      ? await signup(formData)
      : await signin({
          email: formData.email,
          password: formData.password,
        });

  // Save session
  storeSession(response.accessToken, response.user);

  // Update Context
  setUserAuth(getSession());

  toast.success(response.message);

  navigate("/");
} catch (error) {
  toast.error(
    error.response?.data?.message ||
      "Something went wrong. Please try again."
  );
}
};
  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[400px]" onSubmit={handleSubmit} 
        //noValidate
        >
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type === "sign-in" ? "welcome back" : "join us today"}
          </h1>
          {type !== "sign-in" ? (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full Name"
              icon="fi-rs-user"
              value={formData.fullname}
              onChange={handleChange}
              error={errors.fullname}
            />
          ) : (
            ""
          )}
          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-rr-envelope"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <button className="btn-dark center mt-14" type="submit">
            {type.replace("-", " ")}
          </button>
          <div
            className="relative w-full flex items-center gap-2 my-10 opacity-10
                uppercase text-black font-bold
                "
          >
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>
          <button
            className="btn-dark flex items-center justify-center
                gap-4 w-[90%] center"
          >
            <img src={googleIcon} className="w-5" />
            continue with google
          </button>
          {type === "sign-in" ? (
            <p
              className="mt-6 text-dark-grey
                text-xl text-center "
            >
              Don&apos;t have an account ?
              <Link
                to="/signup"
                className="underline text-black text-xl ml-1
                    "
              >
                Join us today
              </Link>
            </p>
          ) : (
            <p
              className="mt-6 text-dark-grey
                text-xl text-center "
            >
              Already have an account ?
              <Link
                to="/signin"
                className="underline text-black
                    "
              >
                Sign in here
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

UserAuthForm.propTypes = {
  type: PropTypes.oneOf(["sign-in", "sign-up"]).isRequired,
};

export default UserAuthForm;
