import { useForm } from 'react-hook-form';
import {  PROJECT_URLS } from '../../../../constans/END_POINTS';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import {RequiredField } from '../../../../constans/VALIDATIONS';
import { AuthorizedToken } from '../../../../constans/END_POINTS';

export default function ProjectData() {
  const location = useLocation();
console.log(location);
const {projectitemdata,type}=location.state?location.state:""
console.log(projectitemdata,type)






const navigate = useNavigate();

  const{register,
    handleSubmit, 
    formState:{errors},
  } = useForm();
  const onSubmit = async (data:any)=>{
    try {
      const url = type === "edit" ? PROJECT_URLS.update(projectitemdata.id) : PROJECT_URLS.addproject;
      let response = await axios({
        method: type==="edit"?"PUT":"POST",
        url,
        data,
        headers:AuthorizedToken
      })
       console.log(response);
      toast.success(type==="edit"?"project is updated successfully":"project is added successfully");
      navigate('/dashboard/project-list');
      } 
      catch (error:any) {
      toast.error(error.response.data.message);
      console.log(error);
      
    }
  }
  return (
    <>
      <div className="px-2 py-3 bg-white">
         <p>View All Projects</p>
         {type==="edit"? <h4>update a Project</h4>: <h4>Add a New Project</h4>}
        
      </div>


      <div className="bg-white p-5 rounded-3 shadow m-5 justify-content-between">
        
  <form className='container-form' onSubmit={handleSubmit(onSubmit)}>
  <label className="main-color my-1">Title</label>
      <div className="input-group ">
      <input type="text" className="form-control form-input"
       placeholder="title"
       aria-label="title" aria-describedby="basic-addon1"
       {...register("title",RequiredField("title"))}
       defaultValue={type==="edit"?projectitemdata.title:""}
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
       {...register("description",RequiredField("description"))}
       defaultValue={type==="edit"?projectitemdata.description:""}
       />
      </div>
     
    
    {errors.description && (
            <span className="text-danger">
              {String(errors.description.message)}
            </span>
    )}
          <div className="d-flex justify-content-between py-2">
          <button className='btn btn-outline-warning p-2' type='submit' onClick={()=>navigate('/dashboard/project-list')}>Cancel</button> 
          <button className='btn btn-warning p-2' type='submit'>Save</button>  
          </div>
  </form>
      
      </div>
    </>
  )
}
