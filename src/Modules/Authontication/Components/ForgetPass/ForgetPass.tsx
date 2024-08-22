import React from "react";
import "./ForgetPass.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const forgetPassword = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Users/Reset/Request",
        data
      );

      navigate("/reset-pass");
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleForgetPassword = (data) => {
    forgetPassword(data);
  };

  return (
    <>
      <div className="forgetPassword-window d-flex flex-column justify-content-center align-items-center px-md-3">
        {/* Form */}
        <form
          onSubmit={handleSubmit(handleForgetPassword)}
          className=" forgetPassword-form d-flex flex-column justify-content-center align-items-center "
        >
          {/* Title */}
          <div className="forgetPassword-title-container">
            <p className=" sub-title m-0 p-0">welcome to PMS</p>
            <h3 className="forgetPassword-title">Forget Password</h3>
          </div>

          {/* --------------Email */}
          <div className="input-group mb-1 ">
            <div className="w-100">
              {" "}
              <label>E-mail</label>
              <input
                type="text"
                className="form-control forgetPassword-input "
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

          {/* Button */}
          <div className="forgetPassword-buttonContainer">
            <button type="submit" className="forgetPassword-button">
              <span>Verify</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
