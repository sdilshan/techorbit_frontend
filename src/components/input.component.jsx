import PropTypes from "prop-types";
import { useState } from "react";

const InputBox = ({
  name,
  type,
  id,
  value,
  placeholder,
  icon,
  onChange,
  error,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative w-full mb-4">
      <div className="relative">
        <input
          name={name}
          type={
            type === "password" ? (passwordVisible ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          id={id}
          className={`input-box ${
            error ? "border-red focus:border-red focus:outline-none" : ""
          }`}
        />

        <i className={"fi " + icon + " input-icon"} />
        {error && type !== "password" && (
          <i
            className="fi fi-rr-exclamation input-icon left-auto right-4"
            style={{ color: "#dc2626" }}
          />
        )}

        {type === "password" && (
          <i
            className={
              "fi fi-rr-eye" +
              (!passwordVisible ? "-crossed" : "") +
              " input-icon left-[auto] right-4 cursor-pointer"
            }
            onClick={() => setPasswordVisible((current) => !current)}
          />
        )}
      </div>
      {error && (
        <p className="mt-1 min-h-[20px] text-sm " style={{ color: "#dc2626" }}>
          {error}
        </p>
      )}
    </div>
  );
};

InputBox.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

export default InputBox;
