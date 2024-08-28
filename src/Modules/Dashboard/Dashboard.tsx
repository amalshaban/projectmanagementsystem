import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Authontication/Components/Context/AuthContext";

export default function Dashboard() {
  let navigate = useNavigate();
  let handleClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      Dashboard
      {/* <button className="btn btn-success p-4" onClick={handleClick}>
        LOGOUT
      </button> */}
    </div>
  );
}
