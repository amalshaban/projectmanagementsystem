import { useForm } from 'react-hook-form';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthorizedToken, USERS_URLs } from '../../../../constans/END_POINTS';
import { EmailValidation } from '../../../../constans/VALIDATIONS';

export default function ForgetPass() {
  let navigate = useNavigate();

  let{
    register,
    handleSubmit,
    formState:{errors},
  } = useForm({ mode: "onBlur" });

 

  let onSubmit = async (data:any)=>{
    try {
      let response = await axios.post(USERS_URLs.ForgetPass, data);
      navigate('/reset-pass');
      toast.success(
        response?.data?.message || 'check your email inbox !'
      );
    
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
          <span className="frist-ch position-relative">F</span>orget Password
        </h3>
  </div>


  <form className='container-form' onSubmit={handleSubmit(onSubmit)}>
    <div className=" my-4">
    <label className="main-color my-1">Email</label>
      <div className="input-group ">
      <input type="text" className="form-control form-input"
       placeholder="Enter your email"
       aria-label="email" aria-describedby="basic-addon1"
       {...register("email",EmailValidation)}
       />
      </div>
     
    </div>
    {errors.email && (
            <span className="text-danger">
              {String(errors.email.message)}
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
