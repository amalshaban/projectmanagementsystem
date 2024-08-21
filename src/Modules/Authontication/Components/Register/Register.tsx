import React, { useRef, useState } from 'react'
import StyleRegister from "./Register.module.css"
import { Button } from 'react-bootstrap'
import { FileUploader } from "react-drag-drop-files";
import { useForm } from 'react-hook-form';
import { PATTERNPASSWORD, PATTERNEMAIL, USERSURL } from "../../../Shared/Components/Constant/ConstUrl.js"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import imagelogo from "../../../../assets/images/LogoRegister.svg"

export default function Register() {
  // use drag and drop file>>>>>>>>>
  const [file, setFile] = useState([]);
  const inputFile = useRef(null);
  
  const handleChange = (e) => {
    setFile([...file, e.target.files[0]]);
    // console.log(...file.name)
  };

const navigate=useNavigate()



  // state to show password 
  const [showPassword, setShowPassword] = useState(true);
  const handelshow = () => {
    setShowPassword(true)
  }
  const handeldontshow = () => {
    setShowPassword(false)
  }

  // <<<<<<<<<<<<this fun becuse convirt Formdata to object>>>>>>>>>>>>>>>>>>>>>
  const convertFormdataToObj = (Data) => {
    const formdata = new FormData()
    formdata.append("userName", Data.userName)
    formdata.append("country", Data.country)
    formdata.append("password", Data.password)
    formdata.append("email", Data.email)
    formdata.append("phoneNumber", Data.phoneNumber)
    formdata.append("confirmPassword", Data.confirmPassword)
    formdata.append("profileImage", Data?.profileImage?.[0])
    return formdata
  }



  // <<<<<<<<<<<<<<<<validation From Register>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>
  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({ mode: "onSubmit" })

  const onsubmit = async (data) => {
    const formdata = convertFormdataToObj(data)
    try {
      const response = await axios.post(USERSURL.POSTEMPLOYEE, formdata)

      console.log(response)
      navigate("/verify-account")
      toast.success(response?.data.message)
    }
    catch (error) {
      // console.log(error)
      toast.error(error?.response?.data.message)
    }

  }

  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className={StyleRegister.HeroContaner}>

          <div className={StyleRegister.Heroheader}>
            <span className={StyleRegister.Title}>welcome to PMS</span>
            <h1><span>C</span>reate new account</h1>

          </div>
          <div onClick={() => inputFile.current.click()} className={StyleRegister.logoheadSec}>
            
            <img  src={imagelogo} alt="" />
          </div>

          <div className={StyleRegister.HeroRegister}>
            <div className={StyleRegister.MainLeft}>
              <div className={StyleRegister.mainUserName}>
                <div className={StyleRegister.userinput}>
                  <label htmlFor="User Name">User Name</label>
                  <input type="text" aria-label='userName' placeholder='Enter your name'
                    {...register("userName", {
                      required: "Name is requierd",
                      minLength: { value: 4, message: "Username must be at least 4 characters" }
                    })}
                  />
                </div>
                {errors.userName ? <p className={StyleRegister.Errors}>{errors.userName.message}</p> : ""}
              </div>
              <div className={StyleRegister.mainCountry}>
                <div className={StyleRegister.userinput}>
                <label htmlFor="Country">Country</label>
                <input type="text" aria-label='country' placeholder='Enter your country'
                  {...register("country", {
                    required: "Country is requierd",
                    minLength: { value: 4, message: "country must be at least 4 characters" }
                  })}
                />
                </div>
                
              {errors.country ? <p className={StyleRegister.Errors}>{errors.country.message}</p> : ""}
              </div>

              <div className={StyleRegister.mainpassword}>
                <div className={StyleRegister.userinput}>

                <label htmlFor="Password">Password  {!showPassword ? <FontAwesomeIcon icon={faEye} className={StyleRegister.iconshow} onClick={handelshow} /> : <FontAwesomeIcon icon={faEyeSlash} className={StyleRegister.icondontshow} onClick={handeldontshow} />}</label>
                <input type={showPassword?"password":"text"} aria-label='password' placeholder='Enter your password'
                  {...register("password", {
                    required: "Password is requierd",
                    pattern: {
                      value: PATTERNPASSWORD.value,
                      message: PATTERNPASSWORD.message,
                    }
                  })}

                />
                </div>


                {errors.password ? <p className={StyleRegister.Errors}>{errors.password.message}</p> : ""}
              </div>

            </div>
            <div className={StyleRegister.MainRight}>
              <div className={StyleRegister.mainemail}>
                <div className={StyleRegister.userinput}>

                <label htmlFor="E-mail">E-mail</label>
                <input type="email" aria-label="email" id="email" placeholder='Enter your E-mail'
                  {...register("email", {
                    required: "Email is requierd",
                    pattern: {
                      value: PATTERNEMAIL.value,
                      message: PATTERNEMAIL.message
                    }

                  })}
                />
                </div>
                {errors.email ? <p className={StyleRegister.Errors}>{errors.email.message}</p> : ""}

              </div>
              <div className={StyleRegister.mainphone}>
                <div className={StyleRegister.userinput}>
                <label htmlFor="Phone Number">Phone Number</label>
                <input type="text" aria-label="phoneNumber" id="phoneNumber" placeholder='Enter your phone number'
                  {...register("phoneNumber", {
                    required: "Phone is requird",
                    minLength: { value: 11, message: "Phone number must be at least 11 characters" }
                  })}
                />
                </div>
               
                {errors.phoneNumber ? <p className={StyleRegister.Errors}>{errors.phoneNumber.message}</p> : ""}

              </div>
              <div className={StyleRegister.mainConfirmpassword}>
                <div className={StyleRegister.userinput}>

                <label htmlFor="confirmPassword">Confirm Password {!showPassword ? <FontAwesomeIcon icon={faEye} className={StyleRegister.iconshow} onClick={handelshow} /> : <FontAwesomeIcon icon={faEyeSlash} className={StyleRegister.icondontshow} onClick={handeldontshow} />} </label>
                <input type={showPassword?"password":"text"} aria-label="confirmPassword" id="confirmPassword" placeholder='Confirm New Password'
                  {...register("confirmPassword", {
                    required: "ConfirmPassword is required",
                    pattern: {
                      value: PATTERNPASSWORD.value,
                      message: PATTERNPASSWORD.message,

                    },
                    validate: (value) =>
                      value === getValues("password") || "Passwords do not match",
                  })}

                />
                </div>

              {errors.confirmPassword ? <p className={StyleRegister.Errors}>{errors.confirmPassword.message}</p> : ""}


              </div>
            </div>
          </div>
          <div className={StyleRegister.HeroSelectimg}>
            <div className={StyleRegister.daragdrop}>
              {/* <FileUploader handleChange={handleChange} types={fileTypes}
                {...register("profileImage")}
              /> */}
              <input  type="file"{...register("profileImage")} onChange={handleChange} ref={inputFile} />
            </div>
          </div>
          <div className={StyleRegister.HeroBttn}>
            <Button type='submit' className={StyleRegister.buttonSubmit}>save</Button>
          </div>

        </div>


      </form>



    </>

  )
}
