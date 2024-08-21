import { Outlet } from 'react-router-dom';
import logo from '../../../../assets/images/PMS3.png'




export default function AuthLayout({title, subTitle}) {

  return (
    <>
    <div className="auth-container d-flex justify-content-center  align-items-center">
      <div className="w-50 text-center">
        <img className='img-fluid' src={logo}></img>
        
        <Outlet/>
      </div>
       
      </div>
    
    </>
    
  )
}
