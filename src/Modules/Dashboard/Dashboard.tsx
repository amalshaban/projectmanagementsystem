import progressimg from "./img/progress.svg"
import taskimg from "./img/tasknaumber.svg"
import projectimg from "./img/projectnumber.svg"
import "./dashbord.css"
import axios from "axios"
import Header from "../Shared/Components/Header/Header";
import { AuthorizedToken, TasksUrl, USERS_URLs } from "../../constans/END_POINTS"
import { useEffect, useState } from "react"
import CountUp from 'react-countup';
export default function Dashboard() {
  const [Taskseplyee, setTaskseplyee] = useState({
    activatedEmployeeCount: 0,
    deactivatedEmployeeCount: 0,
  });  
  const [progressM, setProgressM] = useState({
    toDo: 0,
    inProgress: 0,
    done: 0,
  });


  const [userName, setUserName] = useState(null);

  const getCurrentUser = async () => {
    const response = await axios.get(USERS_URLs.currentUser,{headers:AuthorizedToken});
    console.log(response);
    setUserName(response.data.userName);
  };


  const gettasks = async ()=> {
    try {
      const response = await axios.get(USERS_URLs.Usercount, {headers: AuthorizedToken
      })
      setTaskseplyee(response.data)
      console.log(response.data)

    } catch (errors) {
      console.log(errors)
    }
  }
  const getmanagertask = async  () => {
    try {
      const response = await axios.get(TasksUrl.GetTaskEmploee, {headers: AuthorizedToken
      })
      setProgressM(response.data)
      console.log(response.data)

    } catch (errors) {
      console.log(errors)
    }
  }
  useEffect(() => {
    gettasks()
    getmanagertask()
    getCurrentUser()
    
  }, [])
  return (
    <div className='contanerhome'>
      <Header headerTitel={userName} />
      <div className="section-bar">
        <div className="maindashtasks">
          <div className="headertask">
            <h4 className='titletask'>Tasks</h4>
            <p className='disctask'>Lorem ipsum dolor sit ametipsum dolor.</p>
          </div>
          <div className="maincardtask">
            <div className="cardtasksProgress">
              <img src={progressimg} alt="logo" />
              <div className="TasksCount">
                <span>Progress</span>
                <span>$ <span><CountUp delay={1.8} end={progressM.toDo} duration={2.8} /></span></span>
              </div>

            </div>
            <div className="cardtasksNumber">
              <img src={taskimg} alt="logo" />
              <div className="TasksCount">
                <span>Task Number</span>
                <span><CountUp delay={1.8} end={progressM.inProgress} duration={2.8} /></span>
              </div>
            </div>
            <div className="cardprojectNumber">
              <img src={projectimg} alt="logo" />
              <div className="TasksCount">
                <span>Projects Number</span>
                <span><CountUp delay={1.8} end={progressM.done} duration={2.8} /></span>
              </div>
            </div>
          </div>
        </div>
        <div className="maindashusertask-right">
          <div className="headertask-right">
            <h4 className='titletask'>Users</h4>
            <p className='disctask'>Lorem ipsum dolor sit ametipsum dolor.</p>
          </div>
          <div className="maincardtask-right">
            <div className="cardtasksProgress-right">
              <img src={progressimg} alt="logo" />
              <div className="TasksCount">
                <span>Active</span>
                <span>$ <span><CountUp delay={1.8} end={Taskseplyee?.activatedEmployeeCount} duration={2.8} /></span></span>
              </div>

            </div>
            <div className="cardtasksNumber-right">
              <img src={taskimg} alt="logo" />
              <div className="TasksCount">
                <span>Enactive</span>
                <span><CountUp delay={1.8} end={Taskseplyee.deactivatedEmployeeCount} duration={2.8} /></span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>

  )
}