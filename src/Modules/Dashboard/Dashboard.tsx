
import { useNavigate } from "react-router-dom";
import Header from "../Shared/Components/Header/Header";
import Styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  AuthorizedToken,
  TASKS_URLs,
  USERS_URLs,
} from "../../constans/END_POINTS";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [activatedEmployee, setActivatedEmployee] = useState(null);
  const [deactivateEmployee, setDeactivateEmployee] = useState(null);
  const [toDoCounter, setToDoCounter] = useState(null);
  const [inProgressCounter, setInProgressCounter] = useState(null);
  const [doneCounter, setDoneCounter] = useState(null);
  let navigate = useNavigate();
  let handleClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getTotalUsers = async () => {
    try {
      const response = await axios.get(USERS_URLs.TotalUsers, AuthorizedToken);
      setActivatedEmployee(response?.data?.activatedEmployeeCount);
      setDeactivateEmployee(response?.data?.deactivatedEmployeeCount);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  return (
    <>
      

      <Header headerTitel={"Upskilling"} />

      <div className={`${Styles.dashboardContainer} container-fluid my-4`}>
        <div className="row justify-content-between align-items-center gy-4">
          <div className="col-md-6 text-center text-md-start">
          
          </div>

        </div>
      </div>
    </>
  );
}