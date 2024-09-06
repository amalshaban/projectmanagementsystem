import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  AuthorizedToken,
  PROJECT_URLS,
  TASKS_URLs,
  USERS_URLs,
} from "../../../../constans/END_POINTS";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function TasksData() {
  const location = useLocation();
  const {taskData , type} =location.state?location.state : "";
  let navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);
  const [userList, setUserList] = useState([]);
  console.log(projectList)

  const getAllProjects = async () => {
    try {
      const response = await axios.get(PROJECT_URLS.getlist,{headers:AuthorizedToken});

      setProjectList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const userslistitem = async(pageSize: number,pageNumber: number)=>{
    try {
      let response = await axios.get(`https://upskilling-egypt.com:3003/api/v1/Users`,{headers:AuthorizedToken,
        params: {
          pageSize: pageSize,
          pageNumber: pageNumber ,
        },
      });
    
      setUserList(response.data.data);
      console.log("Fetched User List:", response.data.data); // Log fetched data

      console.log(userList)
      console.log(response)
    } 
    catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProjects();
    userslistitem(10,1);
    return () => {};
  }, []);

  interface FormValues {
    title: string;
    description: string;
    employeeId: number;
    projectId: number;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { title: "", description: "", employeeId: 0, projectId: 0 },
  });
 
  console.log(taskData)
  const onSubmit = async (data: FormValues) => {
    try {
      const url = type === 'edit' ? TASKS_URLs.update(taskData.id) : TASKS_URLs.AddTask;
      const response = await axios({
        method:type==='edit'?'PUT':'POST',
        url,
        data,
        headers: AuthorizedToken
      });
      navigate('/dashboard/tasks-list');
      console.log(response);
      toast.success(type === 'edit' ? "Task updated successfully" : "Task added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="px-2 py-3 bg-white">
       {type === 'edit' ? <h4>update Task</h4> : <h4>Add a New Task</h4>} 
      </div>

      <div className="bg-white p-5 rounded-3 shadow m-5 justify-content-between">
        <form className="container-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="main-color my-1">Title</label>
          <div className="input-group ">
            <input
              type="text"
              className="form-control form-input"
              placeholder="title"
              aria-label="title"
              aria-describedby="basic-addon1"
              {...register("title")}
              defaultValue={type === 'edit'? taskData.title : ""}
            />
          </div>

          {errors.title && (
            <span className="text-danger">{String(errors.title.message)}</span>
          )}

          <br />
          <label className="main-color my-1">Description</label>
          <div className="input-group ">
            <input
              type="text"
              className="form-control form-input"
              placeholder="description"
              aria-label="description"
              aria-describedby="basic-addon1"
              {...register("description")}
              defaultValue={type === 'edit'? taskData.description : ""}
            />
          </div>

          {errors.description && (
            <span className="text-danger">
              {String(errors.description.message)}
            </span>
          )}

          <div className="row">
            <div className="col-md-6">
              <label className="main-color my-1">Project</label>
              <div className="input-group ">
                <select
              defaultValue={type === 'edit'? taskData.project.id : ""}
                  {...register("projectId", {
                    required: "project is required",
                    
                  })}
                  
                  name="project"
                  id=""
                  className=""
                >
                <option disabled>choose</option>
                  {projectList.map((project : any) => (
                       <option key={project.id} value={project.id} className="">
                        
                       {project.title}
                     </option>
                  ))}
                  
                </select>
              </div>
              {errors.projectId && (
                <span className="text-danger">
                  {String(errors.projectId.message)}
                </span>
              )}
            </div>

            <div className="col-md-6">
              <label className="main-color my-1">User</label>
              <div className="input-group ">
                <select
              defaultValue={type === 'edit'? taskData.employee?"id" : "":""}
                 {...register("employeeId", {
                  required: "user is required",
                })}
                
                name="user" id="" className="">
                <option disabled>choose</option>
                {userList.map((user : any) => (
                       <option key={user.id} value={user.id} className="">
                       {user.userName}
                     </option>
                  ))}
                </select>
              </div>

              {errors.employeeId && (
            <span className="text-danger">
              {String(errors.employeeId.message)}
            </span>
    )}
            </div>
          </div>
          <div className="d-flex justify-content-between py-2">
            <button className="btn btn-outline-warning p-2" type="submit" onClick={()=>navigate("/dashboard/tasks-list")}>
              Cancel
            </button>
            <button className="btn btn-warning p-2" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
