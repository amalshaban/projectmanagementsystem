import { useEffect, useState } from 'react'
import { AuthorizedToken, PROJECT_URLS } from '../../../../constans/END_POINTS';
import axios from 'axios';
import { format } from 'date-fns';
import NoData from '../../../Shared/Components/NoData/NoData';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { AuthorizedTokenWithParam } from '../../../../constans/END_POINTS';
import { toast } from 'react-toastify';
=======
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { AuthorizedTokenWithParam } from '../../../../constans/END_POINTS';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';

>>>>>>> 55c3647f4f9b870fbcfd3e29988e0bbea2848ab8


// interface ApiResponse {
//   data: any[];
//   totalNumberOfRecords: number;
// }
interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: Date;
  modificationDate: Date;
}
export default function ProjectList() {

  interface ApiResponse {
    data: any[];
    totalNumberOfRecords: number;
  }
  
<<<<<<< HEAD
  let [projectsList, setProjectsList] = useState<Project[]>([]);;
  const [arrayogpage,Setpageofarray]=useState<number[]>([]);
  const [itemselectid, setitemselectid] = useState<number | null | undefined>(undefined);
  const [show ,Setshow]=useState<boolean>(false)
  const [valuename,Setvaluename]=useState("")
  console.log(valuename)
  console.log(itemselectid)
  
  let getprojectsList = async (title: string,pageSize: number,pageNumber: number )=>{
    try {
      let response = await axios.get(PROJECT_URLS.getlist,AuthorizedTokenWithParam(title,pageSize,pageNumber));
=======
  const [projectsList, setProjectsList] =  useState([]);
  const [arrayogpage,Setpageofarray]=useState<number[]>([]);
  const [valuename,Setvaluename]=useState("")
  const getProjectsList = async (title: string,pageSize: number,pageNumber: number )=>{
    try {
      const response = await axios.get<ApiResponse>(PROJECT_URLS.getlist,AuthorizedTokenWithParam(title,pageSize,pageNumber));
>>>>>>> 55c3647f4f9b870fbcfd3e29988e0bbea2848ab8
    
      setProjectsList(response.data.data);
      console.log(projectsList)
      console.log(response)
<<<<<<< HEAD
      Setpageofarray(Array(response.data.totalNumberOfRecords).fill(0).map((_, i) => i + 1));
      
=======
      Setpageofarray(Array.from({ length: response.data.totalNumberOfRecords }, (_, i) => i + 1));
>>>>>>> 55c3647f4f9b870fbcfd3e29988e0bbea2848ab8
    } 
    catch(error) {
      console.log(error);
    }
  }
useEffect(() => {
<<<<<<< HEAD
  getprojectsList("",4,1);
}, [])


const handelchange=(e: { target: { value: any; }; })=>{
  Setvaluename(e.target.value)
  getprojectsList(e.target.value,1,1)
}
  const handelmenuetoggle=(id: any)=> {
    Setshow(true)
    setitemselectid(id);
    
    
  }
  const closemenue=()=>{
    Setshow(false)
    setitemselectid(null);
  }
const deleteitem=async(id: any)=>{
  try{
    const response=await axios.delete(PROJECT_URLS.delete(id),AuthorizedToken)
    console.log(response)
    getprojectsList("",4,1)
    toast.success("project is deleted successfully")
    closemenue()
  }
  catch (error){
    console.log(error)
  }
=======
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
>>>>>>> 55c3647f4f9b870fbcfd3e29988e0bbea2848ab8
}
  return (
    <>
  
    <div className="d-flex px-2 py-3 bg-white justify-content-between">
      <h3>Projects</h3>
      <Link to={'/dashboard/project-data'} className='btn btn-warning rounded-5 p-2'>Add New Project</Link>
    </div>
<<<<<<< HEAD
    <input className="form-control me-2 " type="search"  placeholder="Search" aria-label="Search" onChange={handelchange}/>
=======
 


    <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" onChange={handelchange}/>
>>>>>>> 55c3647f4f9b870fbcfd3e29988e0bbea2848ab8
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
    <td>{format(new Date(project.creationDate), 'MMMM d, yyyy')}</td>
                  <td>{format(new Date(project.modificationDate), 'MMMM d, yyyy')}</td>
    
    <td>
<<<<<<< HEAD
    
    <i className="fa-solid fa-ellipsis-vertical menu" onClick={()=>handelmenuetoggle(project.id)}></i>
    {itemselectid === project.id && (
                      <div className="dropdown-menu show position-absolute" style={{ right: "50px", top: '40%' }}>
                        <ul className="list-unstyled m-0">
                          <li className="dropdown-item"><i className="fa fa-eye"></i> Show</li>
                          <li className="dropdown-item"><i className="fa fa-edit"></i> Edit</li>
                          <li className="dropdown-item" onClick={()=>deleteitem(project.id)}><i className="fa fa-trash"></i> Delete</li>
                        </ul>
                      </div>
                    )}
   </td>
=======
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
  
>>>>>>> 55c3647f4f9b870fbcfd3e29988e0bbea2848ab8
  </tr>
))}
  
  </tbody>
</table>:<NoData/>} 

</div>

<<<<<<< HEAD
=======







>>>>>>> 55c3647f4f9b870fbcfd3e29988e0bbea2848ab8
<nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
<<<<<<< HEAD
    
      {arrayogpage.map((arraypage)=>{
        return(
          <li className="page-item" key={arraypage} onClick={()=>getprojectsList(valuename,4,arraypage)}>
=======

      {arrayogpage.map((arraypage)=>{
        return(
          <li className="page-item" key={arraypage} onClick={()=>getProjectsList("",4,arraypage)}>
>>>>>>> 55c3647f4f9b870fbcfd3e29988e0bbea2848ab8
            <a className="page-link">{arraypage}</a>
          </li>
        )
      })}
<<<<<<< HEAD
    
    
=======


>>>>>>> 55c3647f4f9b870fbcfd3e29988e0bbea2848ab8
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
<<<<<<< HEAD
=======

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
>>>>>>> 55c3647f4f9b870fbcfd3e29988e0bbea2848ab8
    </>
  )
}
