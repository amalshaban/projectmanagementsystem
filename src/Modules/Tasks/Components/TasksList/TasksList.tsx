import axios from "axios";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { AuthorizedToken, TASKS_URLs, USERS_URLs } from "../../../../constans/END_POINTS";
import { Link } from "react-router-dom";
import NoData from "../../../Shared/Components/NoData/NoData";
import { format } from "date-fns";
import { Button, Modal } from "react-bootstrap";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";
import './taskslist.css';
import { AuthContext } from "../../../Authontication/Components/Context/AuthContext";
import paginate from "../../../Shared/Components/pagination/Pagination";





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
    pageNumber:number;
    pageSize:number;
    
  }
  const [arrayofpage, Setpageofarray] = useState<number>(0);
  const [pagenum,SetPagenum]=useState(0)
  const [valuename,Setvaluename]=useState()
  const [tasks, setTasks] = useState<UsrerTasksType>([]);
  const getUsersTasks = async (pageSize: number,pageNumber: number) =>{
    try{
      const response = await axios.get<UserTasksResponse>(
        TASKS_URLs.getAllTasks,
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          },
          params:{
            pageSize: pageSize,
            pageNumber:pageNumber,
          },
        }
      );
      setTasks(response.data.data);
      console.log(tasks);
      

      

      
    } catch(error){}
  }
  useEffect(() => {
    getUsersTasks(5,1);
    return () => {
    }
  }, []);
  

  const [tasksList, setTasksList] = useState([]);
  const [taskId, setTaskId] = useState(0);
  const {loginData}=useContext(AuthContext)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id: SetStateAction<number>) =>{ 
    setTaskId(id);
    
  };
  const deleteTask = async (taskId:number) =>{
    try {
  const response = await axios.delete(TASKS_URLs.delete(taskId),{headers:AuthorizedToken});
  console.log(response);
  toast.success("Task deleted successfully");
  getTasksList("",5,1);
  handleClose()
  
    } catch (error) {
      console.log(error);
      toast.error("delete failed");
    }
  }

  const getTasksList = async (title:string,pageSize:number,pageNumber:number) => {
    try {
      const response = await axios.get(TASKS_URLs.getlist,{headers:AuthorizedToken,params:
        {
          title:title,
        pageSize: pageSize,
        pageNumber:pageNumber,
      },} );
  
      setTasksList(response.data.data);
      console.log(tasksList);
      SetPagenum(response.data.pageNumber)
      Setpageofarray(response.data.totalNumberOfPages);
    } catch (error) {
      console.log(error);
    }
  };
  
useEffect(() => {
  getTasksList("",5,1);
  
  
}, []);

const handelchange=(e)=>{
  Setvaluename(e.target.value)
  getTasksList(e.target.value,5,1)

}
const showmodel=()=>{
  setShow(true)
}

  
  return (
    <>
    {loginData?.userGroup === 'Manager' ? 
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
      <div className="search-container position-relative pb-3">
        <input
          className="form-control me-2 ps-5 rounded-5 " 
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handelchange}
        />
        <i className="fa fa-search search-icon position-absolute "></i>
      </div>

      {tasksList.length > 0 ? (
        <table className="table-content">
          <thead  className='head-column'>
            <tr>
              <th scope="col">Title<i className="fa-solid fa-angle-down ms-2"></i></th>
              <th scope="col">Status<i className="fa-solid fa-angle-down ms-2"></i></th>
              <th scope="col">project <i className="fa-solid fa-angle-down ms-2"></i></th>
              <th scope="col">Date created <i className="fa-solid fa-angle-down ms-2"></i></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {tasksList.map((task: any) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.status}</td>
                <td>{task.project?.title}</td>
                <td>{format(new Date(task.creationDate), 'MMMM d, yyyy')}</td>

                
                <td className="float-end">
                <i className="fa-solid fa-ellipsis-vertical menu right" onClick={()=>handleShow(task.id)}></i>
    {taskId === task.id && (
                      <div className="dropdown-menu show position-absolute" style={{ right: "50px", top: '40%' }}>
                        <ul className="list-unstyled m-0">
                          <li className="dropdown-item"><i className="fa fa-eye"></i> Show</li>
                          <Link to={`/dashboard/project-data/${task.id}`}state={{taskData:task,type:"edit"}}>
                          <li className="dropdown-item"><i className="fa fa-edit"></i> Edit</li>
                          </Link>
                          <li className="dropdown-item" onClick={showmodel}><i className="fa fa-trash"></i> Delete</li>
                        </ul>
                      </div>
                    )}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <NoData />
      )}
      <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    
    {/* {paginate({currentPage:pagenum,requiredNumberOfPages:5,totalNumberOfPages:arrayofpage}).map((arraypage)=>{
        return(
          <li className="page-item" key={arraypage} onClick={()=>getprojectsList("",4,arraypage)}>
            <a className="page-link">{arraypage}</a>
          </li>
        )
      })} */}
      {paginate({currentPage:pagenum,totalNumberOfPages:arrayofpage,requiredNumberOfPages:5}).map((pagin)=>(
        <li className="page-item" key={pagin} onClick={()=>getTasksList("",3,pagin)}><a className="page-link">{pagin}</a></li>
      ))}
    
    
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>

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