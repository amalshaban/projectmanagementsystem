
import { useForm } from 'react-hook-form';
import { EMAILVALIDATION, PASSWORDVALIDATION } from '../../../../assets/CONSTANTS/VALIDATION';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function LogIn() {
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  let{
    register,
    handleSubmit,
    formState:{errors, isSubmitting},
  } = useForm();

  const toggleVisibility = (setterFunction: any) => {
    setterFunction((prevState: any) => !prevState);
  };

  let onSubmit = async (data:any)=>{
    try {
      let response = await axios.post('https://upskilling-egypt.com:3003/api/v1/Users/Login', data);
    
    toast.success('congratulations, login success !');
    console.log(response)
      } 
     catch (error:any) {
     toast.error(error?.response?.data?.message);
     console.log(error);
      
    }
  }
  return (
    <>
    <div className="auth-title my-4">
    <p className="text-white">Welcome to PMS</p>
    <h3 className="main-colr title">
      <span className="frist-ch position-relative">L</span>ogin
    </h3>
  </div>
        <form  onSubmit={handleSubmit(onSubmit)}>
    <div className=" mb-3">
      <label className="main-colr my-1">Email</label>
      <input type="text" className="input-group form-control" placeholder="Enter your email"
       aria-label="email" aria-describedby="basic-addon1"
       {...register("email",EMAILVALIDATION)}
       />
    </div>
    
    {errors.email && <p className='alert alert-danger p-2'>{errors?.email?.message}</p>}
    <div className="">
       
      <label className="main-colr my-1">Password</label>
      <div className='input-group'>
      <input type={`${isPasswordVisible?"text" : "password"  }`}
       className=" form-control" 
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
    {errors.password && <p className='alert alert-danger p-2'>{errors?.password?.message}</p>}
   
   <div className="d-flex justify-content-between mb-3">
    <Link  to={'/register'} className='text-white mt-2 text-decoration-none' >Register Now ?</Link>
    <Link to={'/forget-pass'} className='text-white mt-2 text-decoration-none' >Forgot Password ?</Link> 
   </div>
   
   
   <div className="main-bg rounded-pill">
    <button type='submit' 
    disabled={isSubmitting}
     className='btn text-white border-0  w-100 rounded-pill'>
      LogIn
      </button>
      </div>
  </form>
  </>
    
  )
}
