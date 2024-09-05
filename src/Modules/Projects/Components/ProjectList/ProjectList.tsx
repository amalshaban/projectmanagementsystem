import { useEffect, useState } from 'react'
import { AuthorizedToken, PROJECT_URLS } from '../../../../constans/END_POINTS';
import axios from 'axios';
import { format } from 'date-fns';
import NoData from '../../../Shared/Components/NoData/NoData';
import imgdelete from "../../../../assets/images/delete-model.svg"
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import Sorting from '../../../Shared/Components/sorting/Sorting';
import "./project.css"
import paginate from '../../../Shared/Components/pagination/Pagination';


export default function ProjectList() {
  const [Title, setTitle] = useState("")
  const [projectId, SetprojectId] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)

  }

  const handleShow = (id: number) => {
    // alert(id)
    SetprojectId(id)
    setShow(true);

  }
  type responsparam = {
    id: string,
    title: string,
    description: string,
    creationDate: string,
    status: string,
    pageSize: number,
    pageNumber: number,
    totalNumberOfPages: number
  }
  // type responsepage={
  //   pageSize: number,
  //   pageNumber: number,
  //   totalNumberOfPages: number
  // }
  type respons=responsparam[]
  type responsprojects = {
    data: respons
  }

  const [ArrayofpagePage, setArrayofPage] = useState(0);
  const [page, setPage] = useState(0)

  const [projectsList, setProjectsList] = useState([]);

  const getProjectsList = async (pageSize: number, pageNumber: number, title: string) => {
    try {
      const response = await axios.get<responsprojects>(PROJECT_URLS.getlist,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            pageSize: pageSize,
            pageNumber: pageNumber,
            title: title
          }
        }
      )
      setArrayofPage(response?.data?.totalNumberOfPages)
      // setArrayofPage(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
      setProjectsList(response?.data?.data);
      console.log(response);
      setPage(response.data.pageNumber)
    } catch (error) {
      console.log(error);
    }
  }


  // console.log(ArrayofpagePage)




  const deleteProject = async (recipeId: number) => {
    try {
      const response = await axios.delete(PROJECT_URLS.delete(recipeId), AuthorizedToken);
      console.log(response);
      toast.success("Project deleted successfully");
      getProjectsList(5, 1, Title);
      setShow(false);

    } catch (error) {
      console.log(error);
      toast.error("delete failed");
    }
  }
  // / const ValueName = (input) => {
  //   SetNamevalue(input.target.value)
  //   isDataUsers(20, 1, input.target.value, Emailvalue, Cantryvalue, groupvalue)

  // }
  const handlevalue = (e: any) => {
    setTitle(e)
    getProjectsList(5, 1, e)
  }

  // console.log(paginate({currentPage:page,requiredNumberOfPages:6,totalNumberOfPages:ArrayofpagePage[0]}))
  useEffect(() => {
    getProjectsList(5, 1, Title);
  }, []);
  return (
    <>

      <div className="d-flex px-2 py-3 bg-white justify-content-between">
        <h3>Projects</h3>
        <Link to={'/dashboard/project-data'} className='btn btn-warning rounded-5 p-2'>+ Add New Project</Link>
      </div>

      {projectsList.length > 0 ? <div className="searchbar">
        <input type="search" onChange={(e) => handlevalue(e.target.value)} placeholder="Search By Title" className="searchbar-input" />
      </div> : ""}

      <div className=" p-2 d-flex justify-content-between  contanertable">
        {projectsList.length > 0 ?
          <table className='table table-hover table-striped '>
            <thead className=' bgthed'>
              <tr className='bgthed'>
                <th>Title<Sorting /></th>
                <th>Statues <Sorting /></th>
                <th>Num Users <Sorting /></th>
                <th>Num Tasks <Sorting /></th>
                <th>Creation Date <Sorting /></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projectsList.map((project: any) => (
                <tr key={project.id}>

                  <td>{project.title}</td>
                  <td>{project?.task?.status}</td>
                  <td>{project.description}</td>
                  <td>{project.description}</td>
                  <td>{format(project.creationDate, 'MMMM d, yyyy')}</td>

                  <td>

                    <DropdownButton title className='contanetDrop'>
                      <div className="contanerdropdown">
                        {/* <i class="fa-solid fa-ellipsis-vertical"></i> */}

                        <Dropdown.Item href="#/action-1">  View</Dropdown.Item>
                        <Link to={`/dashboard/project-data/${project.id}`} state={{ getproject: project, type: "Edit" }}>
                          <Dropdown.Item href="#/action-2"  >Edit</Dropdown.Item>
                        </Link>
                        <Dropdown.Item onClick={() => handleShow(project.id)}>Delete</Dropdown.Item>

                      </div>

                    </DropdownButton>

                  </td>

                </tr>
              ))}

            </tbody>
          </table> : <NoData />}
        {projectsList?.length <= 0 ? "" :
          <nav aria-label="Page navigation example" className='my-50'>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {/* ({ currentPage: page, totalNumberOfPages: currentPage }) */}

              {paginate({ currentPage: page, totalNumberOfPages: ArrayofpagePage, requiredNumberOfPages: 5 }).map((pagenum) => (

                <li key={pagenum} onClick={() => getProjectsList(5, pagenum, "")}><a className="page-link" >{pagenum}</a></li>
              ))
              }
              <li className="page-item">
                <a className="page-link" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        }
      </div>


      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className='text-center'>
          <img src={imgdelete} alt="" />
          <h1 >Delete This Item?</h1>
          <p className='text-center'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteProject(projectId)}>
            Delete this item
          </Button>


        </Modal.Footer>
      </Modal>





    </>
  )
}
