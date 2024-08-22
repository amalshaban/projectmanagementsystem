import { useRef, useState } from 'react'
// import StyleRegister from "./Register.module.css"
import { Button } from 'react-bootstrap'
import { FileUploader } from "react-drag-drop-files";
import { useForm } from 'react-hook-form';
// import { PATTERNPASSWORD, PATTERNEMAIL, USERSURL } from "../../../Shared/Components/Constant/ConstUrl.js"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import imagelogo from "../../../../assets/images/LogoRegister.svg"
import { USERS_URLs } from '../../../../constans/END_POINTS';
import regImg from '../../../../assets/images/regImg.png'
import { EMAILVALIDATION } from '../../../../assets/CONSTANTS/VALIDATION';
import { FieldValidation, PasswordValidation } from '../../../../constans/VALIDATIONS';

export default function Register() {
      
let navigate= useNavigate();
let{
  register,
  getValues,
  handleSubmit,
  formState:{errors},
} = useForm();

const convertFormdataToObj = (data:any) => {
  const formdata = new FormData()
  formdata.append("userName", data.userName)
  formdata.append("country", data.country)
  formdata.append("password", data.password)
  formdata.append("email", data.email)
  formdata.append("phoneNumber", data.phoneNumber)
  formdata.append("confirmPassword", data.confirmPassword)
  data?.profileImage && formdata.append('profileImage', data.profileImage[0])
  return formdata
}

const onSubmit = async (data:any) => {
  const registerData = convertFormdataToObj(data)
  try {
    const response = await axios.post(USERS_URLs.Register, registerData)

    console.log(response);
    navigate("/verify-account")
    toast.success(response?.data.message)
  }
  catch (error) { 
    toast.error(
    error?.response?.data?.message || "Register unsuccessful. Please try again"
  );
  }

}

const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const toggleVisibility = (setterFunction: any) => {
    setterFunction((prevState: any) => !prevState);
  };

  return (
    <>
      <div className="auth-title my-4">
    <p className="text-white">Welcome to PMS</p>
    <h3 className="main-color title">
          <span className="frist-ch position-relative">C</span>reate New Account
        </h3>
        <div className="d-flex justify-content-center">
        <img className='' src={regImg}/>
        </div>
  </div>

  <form className='container-form' onSubmit={handleSubmit(onSubmit)}>
    <div className="row">
      <div className="col-md-6">
      <div className=" ">
    <label className="main-color my-1">Email</label>
      <div className="input-group ">
      <input type="text" className="form-control form-input"
       placeholder="Enter your email"
       aria-label="email" aria-describedby="basic-addon1"
       {...register("email",EMAILVALIDATION)}
       />
      </div>
     
    </div>
    {errors.email && (
            <span className="text-danger">
              {String(errors.email.message)}
            </span>
    )}

      </div>
      <div className='col-md-6'>
<div className="">
    <label className="main-color my-1">userName</label>
      <div className="input-group ">
      <input type="text" className="form-control form-input"
       placeholder="Enter your userName "
       aria-label="userName" aria-describedby="basic-addon1"
       {...register("userName",FieldValidation)}
       />
      </div>
     
    </div>
    {errors.userName && (
            <span className="text-danger">
              {String(errors.userName.message)}
            </span>
    )}

</div>

    </div>
    

    <div className="row">
      <div className="col-md-6">
      <div className="">
    <label className="main-color my-1">Country </label>
      <div className="input-group ">
      <input type="text" className="form-control form-input"
       placeholder="Enter your country "
       aria-label="country" aria-describedby="basic-addon1"
       {...register("country",FieldValidation)}
       />
      </div>
     
    </div>
    {errors.country && (
            <span className="text-danger">
              {String(errors.country.message)}
            </span>
    )}

      </div>
      <div className='col-md-6'>
<div className="">
    <label className="main-color my-1">phoneNumber </label>
      <div className="input-group ">
      <input type="text" className="form-control form-input"
       placeholder="Enter your phoneNumber "
       aria-label="phoneNumber" aria-describedby="basic-addon1"
       {...register("phoneNumber",FieldValidation)}
       />
      </div>
     
    </div>
    {errors.phoneNumber && (
            <span className="text-danger">
              {String(errors.phoneNumber.message)}
            </span>
    )}

</div>

    </div>


    <div className="row">

    <div className='col-md-6'>
<div className="">
    <label className="main-color my-1">password </label>
      <div className="input-group ">
      <input type="password" className="form-control form-input"
       placeholder="Enter your password "
       aria-label="password" aria-describedby="basic-addon1"
       {...register("password",PasswordValidation)}
       />
        <button
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              type="button"
              onClick={() => toggleVisibility(setIsPasswordVisible)}
              className="input-group-text bg-transparent border-0"
            >
              <span className="sr-only">
                {isPasswordVisible ? "hide password" : "show password"}
              </span>
              <i
                className={
                  isPasswordVisible
                    ? "fa-solid text-white fa-eye"
                    : "fa-solid text-white fa-eye-slash"
                }
              ></i>
            </button>
      </div>
     
    </div>
    {errors.password && (
            <span className="text-danger">
              {String(errors.password.message)}
            </span>
    )}

      </div>

      <div className="col-md-6">
      <div className="">
    <label className="main-color my-1">Confirm Password </label>
      <div className="input-group ">
      <input type="password" className="form-control form-input"
       placeholder="confirmPassword "
       aria-label="confirmPassword" aria-describedby="basic-addon1"
       {...register("confirmPassword",PasswordValidation)}
       />
        <button
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              type="button"
              onClick={() => toggleVisibility(setIsPasswordVisible)}
              className="input-group-text bg-transparent border-0"
            >
              <span className="sr-only">
                {isPasswordVisible ? "hide password" : "show password"}
              </span>
              <i
                className={
                  isPasswordVisible
                    ? "fa-solid text-white fa-eye"
                    : "fa-solid text-white fa-eye-slash"
                }
              ></i>
            </button>
      </div>
     
    </div>
    {errors.confirmPassword && (
            <span className="text-danger">
              {String(errors.confirmPassword.message)}
            </span>
    )}

      </div>
      

    </div>

    <div className="row">
        <div className="col-md-12">
        <div className="my-3">
  <input className="form-control form-input" type="file" id="formFile"
           {...register("profileImage")}
           />
</div>
      
        </div>
     </div>

     <div className="main-bg-color rounded-pill py-1 py-md-2">
          <button
            type="submit"
            className="btn text-white border-0  w-100 rounded-pill"
          >
            Save
          </button>
        </div>
        
  </form>



    </>

  )
}