import { useEffect, useState } from 'react'
import { AuthorizedToken, PROJECT_URLS } from '../../../../constans/END_POINTS';
import axios from 'axios';
import { format } from 'date-fns';
import NoData from '../../../Shared/Components/NoData/NoData';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { AuthorizedTokenWithParam } from '../../../../constans/END_POINTS';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';



export default function ProjectList() {

  interface ApiResponse {
    data: any[];
    totalNumberOfRecords: number;
  }
  
  const [projectsList, setProjectsList] =  useState([]);
  const [arrayogpage,Setpageofarray]=useState<number[]>([]);
  const [valuename,Setvaluename]=useState("")
  const getProjectsList = async (title: string,pageSize: number,pageNumber: number )=>{
    try {
      const response = await axios.get<ApiResponse>(PROJECT_URLS.getlist,AuthorizedTokenWithParam(title,pageSize,pageNumber));
    
      setProjectsList(response.data.data);
      console.log(projectsList)
      console.log(response)
      Setpageofarray(Array.from({ length: response.data.totalNumberOfRecords }, (_, i) => i + 1));
    } 
    catch(error) {
      console.log(error);
    }
  }
useEffect(() => {
  getProjectsList("",4,1);
  return () => {
  }
}, []);

// const [showDiv, setShowDiv] = useState(false);
// const [selectedId, setSelectedId] = useState(false);

// const handleIconClick = (id:any) => {
//   setShowDiv(!showDiv);
//   setSelectedId(id);
//   alert(id);
// };
// const [projectId, setProjectId ] =useState();
const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{ 
    // setProjectId(id);
    setShow(true);
  };


const deleteProject = async (projectId:number) =>{
  try {
const response = await axios.delete(PROJECT_URLS.delete(projectId), AuthorizedToken);
console.log(response);
toast.success("Project deleted successfully");
getProjectsList("",1,4);

  } catch (error) {
    console.log(error);
    toast.error("delete failed");
  }
}
const handelchange=(e: { target: { value: any; }; })=>{
  Setvaluename(e.target.value)
  getProjectsList(e.target.value,1,1)
}
  return (
    <>
  
    <div className="d-flex px-2 py-3 bg-white justify-content-between">
      <h3>Projects</h3>
      <Link to={'/dashboard/project-data'} className='btn btn-warning rounded-5 p-2'>+ Add New Project</Link>
    </div>
 


    <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" onChange={handelchange}/>
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
    {/* <i className="fa-regular fa-eye me-1"></i> */}
    <i onClick={()=>handleShow(project.id)} className="fa-solid fa-trash text-danger"></i>
    {/* <Link to={`/dashboard/project-data/:${project.id}`}
    state={{AddProject: project, type: 'edit'}}
    >
    <i className="fa-solid fa-pen-to-square text-success  ms-2"></i>
    </Link> */}
<i className="fa-regular fa-pen-to-square me-1"></i>
{/* <i onClick={()=>deleteProject(project.id)} className="fa-solid fa-trash-can"></i> */}
    {/* <i onClick={()=>handleIconClick(project.id)} className="fa-solid fa-ellipsis-vertical p-1"></i> */}
  {/* <div style={{ display: selectedId === project.id ? 'block' : 'none' }} className='options'>
    <Link to={'/dashboard/project-list'}><i className="fa-regular fa-eye"></i> View</Link><br />
    <Link to={'/dashboard/project-data'}><i className="fa-regular fa-pen-to-square"></i> Edit</Link><br />
    <button onClick ={()=>getId(project.id)} ><i className="fa-solid fa-trash-can"></i> Delete</button>
  </div> */}
   

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
          <li className="page-item" key={arraypage} onClick={()=>getProjectsList("",4,arraypage)}>
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

<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={'Project'}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick = {deleteProject} variant='btn btn-outline-danger'>Delete this Project</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
