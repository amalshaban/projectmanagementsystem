import { useForm } from "react-hook-form"
import { FieldValidation } from "../../../../constans/VALIDATIONS";
import { useEffect, useState } from "react";
import { AuthorizedToken, PROJECT_URLS, USERS_URLs } from "../../../../constans/END_POINTS";
import axios from "axios";

export default function TasksData() {
const [projectList, setProjectList] = useState([]);
const [userList, setUserList] = useState([]);

const getAllProjects = async ()=>{
  try {
    const response = await axios.get(PROJECT_URLS.getlist, AuthorizedToken);
     
    setProjectList(response?.data?.data);
console.log(projectList);
    } 
    catch (error:string ) {
  
    console.log(error);
    
  }
}
const getAllUsers = async ()=>{
  try {
    const response = await axios.get(USERS_URLs.TotalManager, AuthorizedToken);
     
    setUserList(response?.data?.data);
    console.log(userList);
    } 
    catch (error:string ) {
  
    console.log(error);
    
  }
}


useEffect(() => {
  getAllProjects();
  getAllUsers();
  return () => {
    
  }
}, []);

  interface FormValues{
      title: string,
      description: string,
      employeeId: number,
      projectId: number
  };

  const{
    register,
    handleSubmit,
    formState:{errors},
  } = useForm<FormValues>({
    defaultValues: {title:"",description:"",employeeId:0,projectId:0 },
   });
 
  const onSubmit = async (data : FormValues) =>{
      console.log(data);
  };
  
  return (
    <>
     <div className="px-2 py-3 bg-white">
         <h4>Add a New Task</h4>
      </div>

      
      <div className="bg-white p-5 rounded-3 shadow m-5 justify-content-between">
       <form className='container-form' onSubmit={handleSubmit(onSubmit)}>
      <label className="main-color my-1">Title</label>
      <div className="input-group ">
      <input type="text" className="form-control form-input"
       placeholder="title"
       aria-label="title" aria-describedby="basic-addon1"
       {...register("title",FieldValidation)}
       />
      </div>
     
     
      {errors.title && (
            <span className="text-danger">
              {String(errors.title.message)}
            </span>
    )}


        <br/>
            <label className="main-color my-1">Description</label>
      <div className="input-group ">
      <input type="text" className="form-control form-input"
       placeholder="description"
       aria-label="description" aria-describedby="basic-addon1"
       {...register("description",FieldValidation)}
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
        <select name="project" id="" className="">
      
           {projectList.map((project : object) => {
              <option key={project.id} value={project.id}>{project.title}</option>
           })}
           
        </select>
      </div>
     
     
      {/* {errors.title && (
            <span className="text-danger">
              {String(errors.title.message)}
            </span>
    )} */}
      </div>

      <div className="col-md-6">
      <label className="main-color my-1">User</label>
      <div className="input-group ">
        <select name="user" id="" className="">
      
           {/* {userList.map((user: object) => {
              <option key={user.id} value={user.id}>{user.userName}</option>
           })} */}
        </select>
      </div>
     
     
      {/* {errors.title && (
            <span className="text-danger">
              {String(errors.title.message)}
            </span>
    )} */}
      </div>
    </div>
          <div className="d-flex justify-content-between py-2">
          <button className='btn btn-outline-warning p-2' type='submit'>Cancel</button> 
          <button className='btn btn-warning p-2' type='submit'>Save</button>  
          </div>
  </form>
  </div>
    </>
  )
}
