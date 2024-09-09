import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthorizedToken, TASKS_URLs } from "../../../../constans/END_POINTS";
import { Link } from "react-router-dom";
import NoData from "../../../Shared/Components/NoData/NoData";
import { format } from "date-fns";
import { Button, DropdownButton, Modal } from "react-bootstrap";
import DeleteConfirmation from "../../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";
import './taskslist.css';
import { AuthContext } from "../../../Authontication/Components/Context/AuthContext";
import Sorting from "../../../Shared/Components/sorting/Sorting";
import svg from "../../../../assets/images/icontaskdrag.svg"






type UsrerTaskType = {
  id: "";
  title: "";
  description: "";
  status: "ToDo" | "InProgress" | "Done";
}
type UsrerTasksType = UsrerTaskType[];
type UserTasksResponse = {
  data: UsrerTasksType;
}
export default function TasksList() {
  // authcontextRole
  const { loginData } = useContext(AuthContext)
  // <<<<<<<<<<<<<<<<<<<<<get tasks emplyee >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [tasks, setTasks] = useState<UsrerTasksType>([]);
  const getUsersTasks = useCallback(
    async () => {
      try {
        const response = await axios.get<UserTasksResponse>(
          TASKS_URLs.getAllTasks,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            params: {
              pageSize: 100,
              pageNumber: 1,
            
            },
          }
          
        );
        setTasks(response.data.data);
        // console.log(tasks);
  
      } catch (error) { console.log(error) }
    },[]
  )
  useEffect(() => {
    getUsersTasks();
  }, [getUsersTasks]);



  // <<<<<<<<<<<<<<<<<<<<<function delete>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const [taskId, setTaskId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id: number) => {
    setTaskId(id);
    setShow(true);
  };
  const deleteTask = async (taskId: any) => {
    try {
      const response = await axios.delete(TASKS_URLs.delete(taskId), AuthorizedToken);
      console.log(response);
      toast.success("Task deleted successfully");
      getTasksList();
      setShow(false)

    } catch (error) {
      console.log(error);
      toast.error("delete failed");
    }
  }
  // <<<<<<<<<<<<<<<<<<getTasklistby manager>>>>>>>>>>>>>>>>>>>>>>
  const [tasksList, setTasksList] = useState([]);
  const getTasksList = useCallback(
    async () => {
      try {
        const response = await axios.get(TASKS_URLs.getlist, AuthorizedToken);

        setTasksList(response.data.data);

      } catch (error) {
        console.log(error);
      }
    }, []
  )

  useEffect(() => {
    getTasksList();
  }, [getTasksList]);
// const [showViue,Setshowviue]=useState(false)
//   const handleViue = (id) => {
//     // alert(id,state)
//     console.log(showViue)
//     Setshowviue(!false)
//     // setShow(true)
//   }
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
              + Add New Task
            </Link>
          </div>
         
          {tasksList.length > 0 ? (
            <table className="table table-hover table-striped">
              <thead className="bgthed">
                <tr className="bgthed">
                  <th scope="col">Title <Sorting /></th>
                  <th scope="col">Status<Sorting /></th>
                  <th scope="col">User<Sorting /></th>
                  <th scope="col">Project<Sorting /></th>
                  <th scope="col">Date created<Sorting /></th>
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


                      <DropdownButton title className='contanetDrop'>
                        <div className="contanerdropdown">
                          <i className="fa-solid fa-eye me-1" ></i>
                          <Link to={`/dashboard/tasks-data/${task.id}`}
                            state={{ taskData: task, type: "edit" }}>
                            <i className="fa-solid fa-pen-to-square me-1 text-success"></i>
                          </Link>
                          <i onClick={() => handleShow(task.id)} className="fa-solid fa-trash text-danger"></i>

                        </div>

                      </DropdownButton>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='nodataproject'>< NoData /></div>
          )}
        </> : <>
          <div className="wrapper">
            <div>
              <h2>Tasks Board</h2>
            </div>
            <div className="tasks-board" >
              <Column
                refetchtask={getUsersTasks}
                title="ToDo"
                tasks={tasks.filter((task) => task.status == 'ToDo')}
              />
              <Column
                refetchtask={getUsersTasks}
                title="InProgress"
                tasks={tasks.filter((task) => task.status == 'InProgress')}
              />
              <Column
                refetchtask={getUsersTasks}
                title="Done"
                tasks={tasks.filter((task) => task.status == 'Done')}
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
          <DeleteConfirmation deleteItem={'Task'} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => deleteTask(taskId)} variant='btn btn-outline-danger'>Delete this Task</Button>
        </Modal.Footer>
      </Modal>


      {/* {showViue?<div className="viueItem">
            <h1>task User</h1>
            <div className="card">
            <p>Project</p>
            <p>Status</p>
            <p>Title </p>
            </div>

          </div>:""} */}
    </>
  );

}

const Column = ({ title, tasks, refetchtask }: { tasks: UsrerTasksType, title: string, refetchtask: () => Promise<void> }) => {
  const changetasks = useCallback((async ({ taskId, newStatus }: { taskId: string, newStatus: string }) => {
    try {
      await axios.put(TASKS_URLs.changeStatus(taskId),
        {
          status: newStatus
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      refetchtask()
    } catch (error) {
      console.log(error)

    }
  }
  ), [refetchtask])

  return (
    <div className="column">
      <h3>{title}</h3>
      <div className="cards"
        onDrop={(e) => {
          e.preventDefault()
          const taskId = e.dataTransfer.getData("taskID")
          changetasks({ taskId, newStatus: title })
        }}
        onDragOver={(e) => {
          e.preventDefault()
        }}
      >
        {tasks.map(({ id, title }) => (
          <div key={id} className="card"
            draggable={true}
            onDragStart={(e) => {
              e.dataTransfer.setData("taskID", id)
            }}
            onDragEnd={() => {
              console.log({ dragged: title })
            }}
          ><h4>{title}</h4> </div>
        ))}
      </div>
    </div>
  );
};
