import { Outlet } from "react-router-dom";
import logo from "../../../../assets/images/PMS3.png";
export default function AuthLayout() {
  return (
    <div className="auth-container d-flex justify-content-center align-items-center flex-column ">
      <div style={{ width: "35%" }}>
        <div className="w-100 ms-5">
          {" "}
          <img src={logo}></img>
        </div>
        <div className="w-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
