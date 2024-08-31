import { useEffect, useState } from 'react'
import { PROJECT_URLS } from '../../../../constans/END_POINTS';
import axios from 'axios';
import { format } from 'date-fns';
import NoData from '../../../Shared/Components/NoData/NoData';
import { Link } from 'react-router-dom';
import { AuthorizedTokenWithParam } from '../../../../constans/END_POINTS';


interface ApiResponse {
  data: any[];
  totalNumberOfRecords: number;
}

export default function ProjectList() {

  
  let [projectsList, setProjectsList] =  useState([]);
  const [arrayogpage,Setpageofarray]=useState<number[]>([]);
  const [valuename,Setvaluename]=useState("")
  let getCategoriesList = async (title: string,pageSize: number,pageNumber: number )=>{
    try {
      let response = await axios.get<ApiResponse>(PROJECT_URLS.getlist,AuthorizedTokenWithParam(title,pageSize,pageNumber));
    
      setProjectsList(response.data.data);
      console.log(response)
      Setpageofarray(Array.from({ length: response.data.totalNumberOfRecords }, (_, i) => i + 1));
    } 
    catch(error) {
      console.log(error);
    }
  }
useEffect(() => {
   getCategoriesList("",4,1);
}, [])


const handelchange=(e: { target: { value: any; }; })=>{
  Setvaluename(e.target.value)
  getCategoriesList(e.target.value,1,1)
}
  return (
    <>
    <div className="d-flex px-2 py-3 bg-white justify-content-between">
      <h3>Projects</h3>
      <Link to={'/dashboard/project-data'} className='btn btn-warning rounded-5 p-2'>+ Add New Project</Link>
    </div>
    <input className="form-control me-2 " type="search"  placeholder="Search" aria-label="Search" onChange={handelchange}/>
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
<nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    
      {arrayogpage.map((arraypage)=>{
        return(
          <li className="page-item" key={arraypage} onClick={()=>getCategoriesList("",4,arraypage)}>
            <a className="page-link">{arraypage}</a>
          </li>
        )
      })}
    
    
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
    </>
  )
}
