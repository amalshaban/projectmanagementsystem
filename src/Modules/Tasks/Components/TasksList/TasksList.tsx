import axios from "axios";
import { useEffect, useState } from "react";
import { AuthorizedToken, TASKS_URLs, USERS_URLs } from "../../../../constans/END_POINTS";
import { Link } from "react-router-dom";
import NoData from "../../../Shared/Components/NoData/NoData";
import { format } from "date-fns";
import { Button, Modal } from "react-bootstrap";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";

export default function TasksList() {
  const [tasksList, setTasksList] = useState([]);
  const [taskId, setTaskId] = useState(0);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{ 
    setTaskId(id);
    setShow(true);
  };
  const deleteTask = async (taskId:number) =>{
    try {
  const response = await axios.delete(TASKS_URLs.delete(taskId), AuthorizedToken);
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
      const response = await axios.get(TASKS_URLs.getlist, AuthorizedToken);
  
      setTasksList(response.data.data);
      console.log(tasksList);
    } catch (error) {
      console.log(error);
    }
  };
  const [userRole, setUserRole] = useState("");
  const getUserData = async () => {
    try {
      const response = await axios.get(USERS_URLs.currentUser, AuthorizedToken);
      setUserRole(response.data.group.name);
      console.log(userRole);
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
          + Add New Task
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
                <td>{format(task.creationDate, "MMMM d, yyyy")}</td>
                <td>
                  <i className="fa-solid fa-eye me-1"></i>
                  <Link
                    to={`/dashboard/tasks-data/${task.id}`}
                    state={{ taskData: task, type: "edit" }}
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
    <div className="d-flex px-2 py-3 bg-light justify-content-between">
    <h3>Tasks Board</h3>
    <div className="">
        
    </div>
    </div>
    </>  }
   


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
