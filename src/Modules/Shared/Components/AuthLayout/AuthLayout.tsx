import { Outlet } from "react-router-dom";
import logo from "../../../../assets/images/PMS3.png";

export default function AuthLayout() {
  return (
    <div className="auth-container container-fluid">
      
        <div className="d-flex justify-content-center align-items-center">
          <div className="col-md-7">
            <div className="img-logo text-center my-3">
              <img src={logo} alt="" />
            </div>
            <div className="auth-item  rounded rounded-4  p-5 pt-3">
              <Outlet />
            </div>
          </div>
        </div>
    
    </div>
  );
}
