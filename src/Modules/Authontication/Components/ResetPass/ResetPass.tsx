import { useForm } from 'react-hook-form';
import { EMAILVALIDATION, FIELDVALIDATION } from '../../../../assets/CONSTANTS/VALIDATION';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { PasswordValidation } from '../../../../constans/VALIDATIONS';
import { USERS_URLs } from '../../../../constans/END_POINTS';

export default function ResetPass() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const toggleVisibility = (setterFunction: any) => {
    setterFunction((prevState: any) => !prevState);
  };


  let navigate = useNavigate();

  let{
    register,
    handleSubmit,
    formState:{errors},
  } = useForm({ mode: "onBlur" });

 

  let onSubmit = async (data:any)=>{
    try {
      let response = await axios.post(USERS_URLs.Reset, data);
      
      toast.success(
        response.data.message || 'your password was reset successfully !'
      );
      navigate('/login');
    console.log(response)
      } 
     catch (error:any) {
     toast.error(
      error?.response?.data?.message || "unsuccessful. Please try again"
    );

     console.log(error);
      
    }
  }



  return (
    <>
     <div className="auth-title my-4">
    <p className="text-white">Welcome to PMS</p>
    <h3 className="main-color title">
          <span className="frist-ch position-relative">L</span>ogin
        </h3>
  </div>

  
  <form className='container-form' onSubmit={handleSubmit(onSubmit)}>
    <div className=" my-4">
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
    
    <div className=" my-4">
    <label className="main-color my-1">OTP Verification code</label>
      <div className="input-group ">
      <input type="text" className="form-control form-input"
       placeholder="Enter Verification code"
       aria-label="seed" aria-describedby="basic-addon1"
       {...register("seed",FIELDVALIDATION)}
       />
      </div>
     
    </div>
    {errors.seed && (
            <span className="text-danger">
              {String(errors.seed.message)}
            </span>
    )}
   
   <div className="my-4">  
      <label className="main-color my-1">Password</label>
      <div className='input-group'>
      <input type={`${isPasswordVisible?"text" : "password"  }`}
       className="form-control form-input" 
       placeholder="Enter your password"
       aria-label="password"
       aria-describedby="basic-addon1"
       {...register("password", PasswordValidation)}/>
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

<div className="my-4">  
      <label className="main-color my-1">Confirm Password</label>
      <div className='input-group'>
      <input type={`${isPasswordVisible?"text" : "password"  }`}
       className="form-control form-input" 
       placeholder="Enter your password"
       aria-label="confirmPassword"
       aria-describedby="basic-addon1"
       {...register("confirmPassword", PasswordValidation)}/>
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
   
   <div className="main-bg-color rounded-pill py-1 py-md-2">          
    <button
            type="submit"
            className="btn text-white border-0  w-100 rounded-pill"
          >
            LogIn
          </button>
        </div>


  </form>
  

    </>
  )
}
