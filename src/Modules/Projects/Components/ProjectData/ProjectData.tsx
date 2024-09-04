import { useForm } from 'react-hook-form';
import {  PROJECT_URLS } from '../../../../constans/END_POINTS';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { FieldValidation } from '../../../../constans/VALIDATIONS';
import { AuthorizedToken } from '../../../../constans/END_POINTS';

export default function ProjectData() {
  const location = useLocation();
console.log(location);

const status = location.state?.type ==='edit';
const project = location.state?.AddProject;



const navigate = useNavigate();

  const{register,
    handleSubmit, 
    formState:{errors},
  } = useForm();
  const onSubmit = async (data:any)=>{
    try {
<<<<<<< HEAD
      let response = await axios.post(PROJECT_URLS.addproject, data,AuthorizedToken);
=======
      const response = await axios(
        {
        method: status ? 'put' : 'post',
        url: status ? PROJECT_URLS.update(project.id): PROJECT_URLS.addproject,
        data, 
        AuthorizedToken
      }
    );
>>>>>>> 55c3647f4f9b870fbcfd3e29988e0bbea2848ab8
       console.log(response);
      toast.success('Project Added Successfully !');
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
         <h4>Add a New Project</h4>
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
          <div className="d-flex justify-content-between py-2">
          <button className='btn btn-outline-warning p-2' type='submit'>Cancel</button> 
          <button className='btn btn-warning p-2' type='submit'>Save</button>  
          </div>
  </form>
      
      </div>
    </>
  )
}
