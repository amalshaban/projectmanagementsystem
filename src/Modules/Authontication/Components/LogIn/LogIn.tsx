
import { useForm } from 'react-hook-form';
import { EMAILVALIDATION, PASSWORDVALIDATION } from '../../../../assets/CONSTANTS/VALIDATION';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function LogIn() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  let{
    register,
    handleSubmit,
    formState:{errors, isSubmitting},
  } = useForm();
  let onSubmit = async (data:any)=>{
    try {
      let response = await axios.post('https://upskilling-egypt.com:3003/api/v1/Users/Login', data);
      
    //   localStorage.setItem('token', response.data.token);
    //   saveLoginData();
    // toast.success();
    //   navigate('/dashboard');
    
      } 
     catch (error:any) {
     toast.error(error?.response?.data?.message);
     console.log(error);
      
    }
  }
  return (
    <div className='login-container'>
        <span className='text-white'>welcome to PMS</span>
        <h1 className='login-header'>Login</h1>
        <form  onSubmit={handleSubmit(onSubmit)}>
    <div className=" mb-3">
      <label className="my-1 text-warning">Email</label>
      <input type="text" className="input-group form-control" placeholder="Enter your email"
       aria-label="email" aria-describedby="basic-addon1"
       {...register("email",EMAILVALIDATION)}
       />
    </div>
    
    {errors.email && <p className='alert alert-danger p-2'>{errors?.email?.message}</p>}
    <div className="">
       
      <label className="my-1 text-warning">Password</label>
      <input type={`${isPasswordVisible?"text" : "password"  }`} className="input-group form-control" placeholder="Enter your password"
       aria-label="password" aria-describedby="basic-addon1"
       {...register("password", PASSWORDVALIDATION)}/>
       <button
       onMouseDown={(e)=>{e.preventDefault()}}
       onMouseUp={(e)=>{e.preventDefault()}}
       onClick={()=>setIsPasswordVisible((prev) => !prev)}
        type='button'
       className="input-group-text" id="basic-addon1">
          <i className={`fa-solid ${isPasswordVisible?"fa-eye" : "fa-eye-slash"  }`}></i></button>
      
    </div>
    {errors.password && <p className='alert alert-danger p-2'>{errors?.password?.message}</p>}
   
   <div className="d-flex justify-content-between mb-3">
    {/* <Link to={} className='reg' >Register Now?</Link>
    <Link to={} className='forgot' >Forgot Password?</Link> */}
   </div>
   
    <button disabled={isSubmitting} className='btn btn-success w-100'>LogIn</button>
  </form>
    </div>
    
  )
}
