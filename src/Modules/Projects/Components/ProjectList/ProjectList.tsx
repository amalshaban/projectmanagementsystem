import { useEffect, useState } from 'react'
import { AuthorizedToken, PROJECT_URLS } from '../../../../constans/END_POINTS';
import axios from 'axios';
import { format } from 'date-fns';
import NoData from '../../../Shared/Components/NoData/NoData';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';




export default function ProjectList() {

  
  const [projectsList, setProjectsList] =  useState([]);
  const getProjectsList = async ()=>{
    try {
      const response = await axios.get(PROJECT_URLS.getlist, AuthorizedToken
      )
    
      setProjectsList(response?.data?.data);
      console.log(projectsList)
    } catch (error) {
      console.log(error);
    }
  }
useEffect(() => {
  getProjectsList();
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
const [projectId, setProjectId ] =useState();
const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) =>{ 
    setProjectId(id);
    setShow(true);
  };


const deleteProject = async (projectId:number) =>{
  try {
const response = await axios.delete(PROJECT_URLS.delete(projectId), AuthorizedToken);
console.log(response);
toast.success("Project deleted successfully");
getProjectsList();

  } catch (error) {
    console.log(error);
    toast.error("delete failed");
  }
}
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
    <i className="fa-regular fa-eye me-1"></i>
    <i onClick={()=>handleShow(project.id)} className="fa-solid fa-trash text-danger"></i>
    <Link to={`/dashboard/project-data/:${project.id}`}
    state={{AddRecipie: project, type: 'edit'}}
    >
    <i className="fa-solid fa-pen-to-square text-success  ms-2"></i>
    </Link>
<i className="fa-regular fa-pen-to-square me-1"></i>
<i onClick={()=>deleteProject(project.id)} className="fa-solid fa-trash-can"></i>
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

<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={'Recipie'}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={deleteRecipie} variant='btn btn-outline-danger'>Delete this Recipie</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
