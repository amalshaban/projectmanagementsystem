import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { AuthorizedToken, TASKS_URLs, USERS_URLs } from "../../../../constans/END_POINTS";
import { Link } from "react-router-dom";
import NoData from "../../../Shared/Components/NoData/NoData";
import { format } from "date-fns";
import { Button, Modal } from "react-bootstrap";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";
import './taskslist.css';





const Column = ({ title, tasks  }:{tasks:UsrerTasksType, title:string}) =>{
  return(
    <div className="column">
      <h3>{title}</h3>
      <div className="cards">
        {tasks.map((task)=>(
          <div className="card">{task.title}</div>
        ))}
      </div>
    </div>
  );
}; 


type  UsrerTaskType = {
  id: "";
  title: "";
  description: "";
  status: "ToDo"|"InProgress" |"Done";
}
type UsrerTasksType = UsrerTaskType[];

export default function TasksList() {
  

  type UserTasksResponse ={
    data: UsrerTasksType;
  }
  const [tasks, setTasks] = useState<UsrerTasksType>([]);
  const getUsersTasks = async () =>{
    try{
      const response = await axios.get<UserTasksResponse>(
        TASKS_URLs.getAllTasks,
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          },
          params:{
            pageSize: 100,
            pageNumber: 1,
          },
        }
      );
      setTasks(response.data.data);
      console.log(tasks);
      
    } catch(error){}
  }
  useEffect(() => {
    getUsersTasks();
    return () => {
    }
  }, []);
  

  const [tasksList, setTasksList] = useState([]);
  const [taskId, setTaskId] = useState(0);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id: SetStateAction<number>) =>{ 
    setTaskId(id);
    setShow(true);
  };
  const deleteTask = async (taskId:number) =>{
    try {
  const response = await axios.delete(TASKS_URLs.delete(taskId),{headers:AuthorizedToken});
  console.log(response);
  toast.success("Task deleted successfully");
  getTasksList();
  
    } catch (error) {
      console.log(error);
      toast.error("delete failed");
    }
  }

  const getTasksList = async () => {
    try {
      const response = await axios.get(TASKS_URLs.getlist,{headers:AuthorizedToken} );
  
      setTasksList(response.data.data);
      console.log(tasksList);
    } catch (error) {
      console.log(error);
    }
  };
  const [userRole, setUserRole] = useState("");
  const getUserData = async () => {
    try {
      const response = await axios.get(USERS_URLs.currentUser,{headers:AuthorizedToken});
      setUserRole(response.data.group.name);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  getTasksList();
  getUserData();
  return () => {
    
  }
}, []);

  return (
    <>
    {userRole === 'Manager' ? 
    <>
       <div className="d-flex px-2 py-3 bg-white justify-content-between">
        <h3>Tasks</h3>
        <Link
          to={"/dashboard/tasks-data"}
          className="btn btn-warning rounded-5 p-2"
        >
          Add New Task
        </Link>
      </div>

      {tasksList.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">User</th>
              <th scope="col">Project</th>
              <th scope="col">Date created</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {tasksList.map((task: any) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.status}</td>
                <td>{task?.employee?.userName}</td>
                <td>{task?.project?.title}</td>
                <td>{task.employee?"userName":""}</td>
                <td>{task.project.title}</td>
                <td>{format(task.creationDate, "MMMM d, yyyy")}</td>
                <td>
                  <i className="fa-solid fa-eye me-1"></i>
                  <Link
                    to={`/dashboard/tasks-data/${task.id}`}
                    state={{ taskData:task,type: "edit" }}
                  >
                    <i className="fa-solid fa-pen-to-square me-1 text-success"></i>
                  </Link>
                  <i onClick={() => handleShow(task.id)} className="fa-solid fa-trash text-danger"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <NoData />
      )}
    </> :  <>
    <div className="wrapper">
      <div>
      <h2>Tasks Board</h2>  
      </div>
    <div className="tasks-board">
        <Column
        title="To Do"
        tasks={tasks.filter((task) => task.status == 'ToDo')}
        />
          <Column
        title="In Progress"
        tasks={tasks.filter((task) => task.status =='InProgress')}
        />
          <Column
        title="Done"
        tasks={tasks.filter((task) => task.status =='Done')}
        />
      </div>
      </div>
    </>
    }
   


<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={'Task'}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick = {()=>deleteTask(taskId)} variant='btn btn-outline-danger'>Delete this Task</Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}