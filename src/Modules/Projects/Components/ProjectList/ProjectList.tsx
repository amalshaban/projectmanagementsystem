import { useEffect, useState } from 'react'
import { AuthorizedToken, PROJECT_URLS } from '../../../../constans/END_POINTS';
import axios from 'axios';
import { format } from 'date-fns';
import NoData from '../../../Shared/Components/NoData/NoData';
import { Link } from 'react-router-dom';
import { AuthorizedTokenWithParam } from '../../../../constans/END_POINTS';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';


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
  
  let [projectsList, setProjectsList] = useState<Project[]>([]);
  const [arrayogpage,Setpageofarray]=useState<number[]>([]);
  const [itemselectid, setitemselectid] = useState<number | null | undefined>(undefined);
  // const [show ,Setshow]=useState<boolean>(false)
  const [valuename,Setvaluename]=useState("")
  console.log(valuename)
  console.log(itemselectid)
  
  let getprojectsList = async (title: string,pageSize: number,pageNumber: number )=>{
    try {
      let response = await axios.get<ApiResponse>(PROJECT_URLS.getlist,AuthorizedTokenWithParam(title,pageSize,pageNumber));
    
      setProjectsList(response.data.data);
      console.log(projectsList)
      console.log(response)
      Setpageofarray(Array(response.data.totalNumberOfRecords).fill(0).map((_, i) => i + 1));
      
    } 
    catch(error) {
      console.log(error);
    }
  }
useEffect(() => {
  getprojectsList("",4,1);
}, [])


  const handelmenuetoggle=(id: any)=> {
    setShow(true)
    setitemselectid(id);
    
    
  }
  const closemenue=()=>{
    setShow(false)
    setitemselectid(null);
  }
const deleteitem=async(id: any)=>{
  try{
    const response=await axios.delete(PROJECT_URLS.delete(id),{headers:AuthorizedToken})
    console.log(response)
    toast.success("project is deleted successfully")
    getprojectsList("",4,1)
   
    closemenue()
  }
  catch (error){
    console.log(error)
  }
  useEffect(()=>{
    getprojectsList("",4,1);

  },[])
  

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
  // const handleShow = (id: any) =>{ 
  //   // setProjectId(id);
  //   setShow(true);
  // };


const handelchange=(e: { target: { value: any; }; })=>{
  Setvaluename(e.target.value)
  getprojectsList(e.target.value,1,1)
}
  return (
    <>
  
    <div className="d-flex px-2 py-3 bg-white justify-content-between">
      <h3>Projects</h3>
      <Link to={'/dashboard/project-data'} className='btn btn-warning rounded-5 p-2'>Add New Project</Link>
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
    <td>{format(new Date(project.creationDate), 'MMMM d, yyyy')}</td>
                  <td>{format(new Date(project.modificationDate), 'MMMM d, yyyy')}</td>
    
    <td>
    
    <i className="fa-solid fa-ellipsis-vertical menu" onClick={()=>handelmenuetoggle(project.id)}></i>
    {itemselectid === project.id && (
                      <div className="dropdown-menu show position-absolute" style={{ right: "50px", top: '40%' }}>
                        <ul className="list-unstyled m-0">
                          <li className="dropdown-item"><i className="fa fa-eye"></i> Show</li>
                          <Link to={`/dashboard/project-data/${project.id}`}state={{projectitemdata:project,type:"edit"}}>
                          <li className="dropdown-item"><i className="fa fa-edit"></i> Edit</li>
                          </Link>
                          <li className="dropdown-item" onClick={()=>deleteitem(project.id)}><i className="fa fa-trash"></i> Delete</li>
                        </ul>
                      </div>
                    )}
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
          <li className="page-item" key={arraypage} onClick={()=>getprojectsList("",4,arraypage)}>
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
          <Button onClick = {()=>deleteitem(itemselectid)} variant='btn btn-outline-danger'>Delete this Project</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
}



function setShow(_arg0: boolean) {
  throw new Error('Function not implemented.');
}

