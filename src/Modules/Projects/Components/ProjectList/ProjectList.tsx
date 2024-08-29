import { useEffect, useState } from 'react'
import { AuthorizedToken, PROJECT_URLS } from '../../../../constans/END_POINTS';
import axios from 'axios';
import { format } from 'date-fns';
import NoData from '../../../Shared/Components/NoData/NoData';
import { Link, useNavigate } from 'react-router-dom';



export default function ProjectList() {

  
  let [projectsList, setProjectsList] =  useState([]);
  let getCategoriesList = async ()=>{
    try {
      let response = await axios.get(PROJECT_URLS.getlist, AuthorizedToken
      );
    
      setProjectsList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
useEffect(() => {
   getCategoriesList();
  return () => {
  }
}, [])


  return (
    <>
    <div className="d-flex px-2 py-3 bg-white justify-content-between">
      <h3>Projects</h3>
      <Link to={'/dashboard/project-data'} className='btn btn-warning rounded-5 p-2'>+ Add New Project</Link>
    </div>
 
<div className= "p-2 d-flex justify-content-between">
{projectsList.length > 0 ?  
  <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Discription</th>
      <th scope="col">Creation Date</th>
      <th scope="col">Modification Date</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
{projectsList.map((project:any)=>(
  <tr key={project.id}>
    
    <td>{project.title}</td>
    <td>{project.description}</td>
    <td>{format(project.creationDate, 'MMMM d, yyyy')}</td>
    <td>{format(project.modificationDate, 'MMMM d, yyyy')}</td>
    
    <td>
   </td>
  </tr>
))}

  </tbody>
</table>:<NoData/>} 
</div>

    </>
  )
}
