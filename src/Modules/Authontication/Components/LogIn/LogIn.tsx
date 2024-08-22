import { useForm } from 'react-hook-form';
import { EMAILVALIDATION, PASSWORDVALIDATION } from '../../../../assets/CONSTANTS/VALIDATION';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { USERS_URLs } from '../../../../constans/END_POINTS';

export default function LogIn() {
  let navigate = useNavigate();
  let{
    register,
    handleSubmit,
    formState:{errors},
  } = useForm({ mode: "onBlur" });


  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const toggleVisibility = (setterFunction: any) => {
    setterFunction((prevState: any) => !prevState);
  };

  let onSubmit = async (data:any)=>{
    try {
      let response = await axios.post(USERS_URLs.Login, data);
      navigate('/dashboard');
      toast.success(
        response.data.message || 'congratulations, login success !'
      );
    
    console.log(response)
      } 
     catch (error:any) {
     toast.error(
      error?.response?.data?.message || "Login unsuccessful. Please try again"
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
    
       
    <div className="my-4">  
      <label className="main-color my-1">Password</label>
      <div className='input-group'>
      <input type={`${isPasswordVisible?"text" : "password"  }`}
       className="form-control form-input" 
       placeholder="Enter your password"
       aria-label="password"
       aria-describedby="basic-addon1"
       {...register("password", PASSWORDVALIDATION)}/>
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
   
   <div className="d-flex justify-content-between mb-3">
    <Link  to={'/register'} 
    className='text-white mt-2 text-decoration-none' 
    >
      Register Now ?
      </Link>

    <Link to={'/forget-pass'} 
    className='text-white mt-2 text-decoration-none'
     >
      Forgot Password ?
      </Link> 
   </div>
   
   
   
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
