import { Outlet } from "react-router-dom";
import logo from '../../../../assets/images/PMS3.png'
export default function AuthLayout() {
  return (
    <div className="auth-container d-flex justify-content-center align-items-center">
      <div className=" ">
        <img className="LogoAuth" src={logo}></img>
        <Outlet />
      </div>
    </div>
  )
}
