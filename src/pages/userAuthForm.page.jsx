import PropTypes from "prop-types";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { useState } from "react";
import { signin } from "../services/authService";


const UserAuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

  console.log(formData,"This is form data")
   try {
    const response = await signin({
      email: "dilshan@gmail.com",
      password: "Sdilshan919",
    });

    console.log("Response:", response);
  } catch (error) {
    console.error(error.response?.data || error);
  }
  };
  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[400px]"
          onSubmit={handleSubmit}>
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
          />
          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            className="btn-dark center mt-14"
            type="submit"
          >
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
