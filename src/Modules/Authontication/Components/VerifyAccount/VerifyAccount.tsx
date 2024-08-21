import React from 'react'
import { Button } from 'react-bootstrap'
import StyleVrify from "./veify.module.css"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { USERSURL,PATTERNEMAIL} from "../../../Shared/Components/Constant/ConstUrl.js"
import {toast} from "react-toastify" 
import { useNavigate } from 'react-router-dom'



export default function VerifyAccount() {
const navigate=useNavigate()

  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({ mode: "all" })
  const onsubmit = async (data) => {
    try {
      const response = await axios.put(USERSURL.PUTVERIFY, data)
  
      // console.log(response)
      navigate("/")
      toast.success(response?.data.message)
    }

    catch (error) {
      // console.log(error)
      toast.error(error.response?.data.message)
    }
  
  }


  return (
    <>


      <form onSubmit={handleSubmit(onsubmit)}>
        <div className={StyleVrify.HeroContaner}>

          <div className={StyleVrify.Heroheader}>
            <span className={StyleVrify.Title}>welcome to PMS</span>
            <h1><span>V</span>erify account</h1>

          </div>

          <div className={StyleVrify.HeroRegister}>
            <div className={StyleVrify.MainLeft}>
            <div className={StyleVrify.mainemail}>
                <div className={StyleVrify.userinput}>

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
                {errors.email ? <p className={StyleVrify.Errors}>{errors.email.message}</p> : ""}

              </div>
              <div className={StyleVrify.mainCountry}>
                <div className={StyleVrify.userinput}>
                  <label htmlFor="Country">Verify</label>
                  <input type="text" aria-label='code' placeholder='Enter Verification'
                    {...register("code", {
                      required: "Code is requierd",
                      minLength: { value: 4, message: "Code must be at least lt 4 characters" }
                    })}
                  />
                </div>

                {errors.code ? <p className={StyleVrify.Errors}>{errors.code.message}</p> : ""}
              </div>

            </div>

          </div>

          <div className={StyleVrify.HeroBttn}>
            <Button type='submit' className={StyleVrify.buttonSubmit}>save</Button>
          </div>

        </div>


      </form>


    </>

  )
}
