import React from "react";
import "./ResetPassword.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPass() {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const resetPassword = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Users/Reset",
        data
      );
      console.log(response.data.message);
      navigate("/login");
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetPassword = (data) => {
    resetPassword(data);
  };

  return (
    <>
      <div className="resetPassword-window d-flex flex-column justify-content-center align-items-center px-md-3">
        {/* Form */}
        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className=" resetPassword-form d-flex flex-column justify-content-center align-items-center "
        >
          {/* Title */}
          <div className="resetPassword-title-container">
            <p className=" resetPassword-subTitle m-0 p-0">welcome to PMS</p>
            <h3 className="resetPassword-title">Reset Password</h3>
          </div>

          {/* --------------Email */}
          <div className="input-group mb-1 ">
            <div className="w-100">
              {" "}
              <label className="resetPassword-label ">E-mail</label>
              <input
                type="text"
                className="form-control resetPassword-input "
                placeholder="Enter your E-mail"
                aria-label="email"
                aria-describedby="basic-addon1"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-danger"> {errors.email.message} </p>
            )}
          </div>

          {/* --------------OTP */}
          <div className="input-group mb-1 ">
            <div className="w-100">
              <label className="resetPassword-label ">OTP Verification</label>
              <input
                type="text"
                className="form-control resetPassword-input"
                placeholder="Enter Verification"
                aria-label="seed"
                aria-describedby="basic-addon1"
                {...register("seed", {
                  required: "OTP is required",
                  pattern: {
                    value: /^[a-zA-Z0-9]{4}$/,
                    message: "OTP should be 4 alphanumeric characters",
                  },
                })}
              />
            </div>

            {errors.seed && (
              <p className="text-danger"> {errors.seed.message} </p>
            )}
          </div>

          {/* --------------Password */}
          <div className="input-group mb-1">
            <div className="w-100">
              {" "}
              <label className="resetPassword-label "> New Password</label>
              <div className="d-flex justify-content-end align-items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control resetPassword-input"
                  placeholder="Enter Your Password"
                  aria-label="password"
                  aria-describedby="basic-addon1"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters",
                    },
                  })}
                />
                <i
                  role="pointer"
                  className={`fa-solid ${
                    showPassword ? "fa-eye" : "fa-eye-slash"
                  } position-absolute eye-icon`}
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
            {errors.password && (
              <p className="text-danger"> {errors.password.message} </p>
            )}
          </div>

          {/* --------------Confirm Password */}
          <div className="input-group mb-1">
            <div className="w-100">
              {" "}
              <label className="resetPassword-label "> Confirm Password</label>
              <div className="d-flex justify-content-end align-items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control resetPassword-input"
                  placeholder="confirmPassword"
                  aria-label="confirmPassword"
                  aria-describedby="basic-addon1"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                <i
                  role="pointer"
                  className={`fa-solid ${
                    showPassword ? "fa-eye" : "fa-eye-slash"
                  } position-absolute eye-icon`}
                  onClick={togglePasswordVisibility}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Button */}
          <div className="resetPassword-buttonContainer">
            <button type="submit" className="resetPassword-button">
              <span>Save</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
