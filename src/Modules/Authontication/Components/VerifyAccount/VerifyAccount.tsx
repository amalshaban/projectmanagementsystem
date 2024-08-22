import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EMAILVALIDATION, FIELDVALIDATION } from '../../../../assets/CONSTANTS/VALIDATION';
import { AuthorizedToken, USERS_URLs } from '../../../../constans/END_POINTS';

export default function VerifyAccount() {
  let navigate= useNavigate();
  let{
    register,
    handleSubmit,
    formState:{errors},
  } = useForm();
  
  let onSubmit = async (data:any)=>{
    try {
      let response = await axios.put(USERS_URLs.Verify,AuthorizedToken, data);
      toast.success(
        response.data.message || "Your account has been successfully verified!"
      );
      
      navigate('/dashboard');
    
      } 
      catch (error:any) {
      
      toast.error(
        error.message || "verification proccess was unsuccessful. Please try again"
      );
      console.log(error);
      
    }
  }
  return (
    <>
      <div className="auth-title my-4">
    <p className="text-white">Welcome to PMS</p>
    <h3 className="main-color title">
          <span className="frist-ch position-relative">V</span>erify Account
        </h3>
  </div>
    

    <form  onSubmit={handleSubmit(onSubmit)}>

    <div className="my-4"> 
    <label className="main-color my-1">Email</label>
    <div className="input-group">
      <input type="text" 
      className="form-control form-input" 
      placeholder="email"
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
    <label className="main-color my-1">OTP Verification</label>
      <input type="text" 
      className="form-control form-input"
       placeholder="Enter Verification Code"
       aria-label="code" aria-describedby="basic-addon1"
       {...register("code",FIELDVALIDATION)}
       />
    </div>
    {errors.code && (
            <span className="text-danger">
              {String(errors.code.message)}
            </span>
    )}
   
   <div className="main-bg-color rounded-pill py-1 py-md-2">          
    <button
            type="submit"
            className="btn text-white border-0  w-100 rounded-pill"
          >
            Verify
          </button>
        </div>
  </form>
    </>
  )
}
