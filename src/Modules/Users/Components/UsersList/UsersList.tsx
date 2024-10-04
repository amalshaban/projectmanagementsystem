import { useEffect, useState } from "react"
import { AuthorizedToken,BASE_IMG } from "../../../../constans/END_POINTS";
import axios from "axios";
import NoData from "../../../Shared/Components/NoData/NoData";


export default function UsersList() {
  const [userlist, Setuserlist] = useState([]);
  const [arrayogpage, Setpageofarray] = useState<number[]>([]);
  const getuserslist = async (
    userName: string,
    pageSize: number,
    pageNumber: number
  ) => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3003/api/v1/Users/Manager",{
          headers: { Authorization: `Bearer ${localStorage.token}` } ,
          params: {userName:userName , pageSize: pageSize, pageNumber: pageNumber}
        });

      Setuserlist(response.data.data);
      Setpageofarray(
        Array.from(
          { length: response.data.totalNumberOfRecords },
          (_, i) => i + 1
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  const toggleActive=async(id: number)=>{
    try{
const response=await axios.put(`https://upskilling-egypt.com:3003/api/v1/Users/${id}`,{},{headers:AuthorizedToken})
console.log(response)
getuserslist("",10,1) 
    }
    catch(error){
      console.log(error)
    }
  }
useEffect(() => {
  getuserslist("",6,1);
}, [])
console.log("Current User List:", userlist); // Log updated userlist after render

  return (
    <>
    <div className="d-flex px-2 py-3 bg-white justify-content-between">
      <h3>users</h3>
    </div>
    {/* <input className="form-control me-2 " type="search"  placeholder="Search" aria-label="Search" onChange={handelchange}/> */}
<div className= "p-2 d-flex justify-content-between">
{userlist.length > 0 ?  
  <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">isActivated</th>
      <th scope="col">userName</th>
      <th scope="col">image</th>
      <th scope="col">email</th>
      <th scope="col">country</th>
    
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
{userlist.map((user:any)=>(
  <tr key={user.id}>
    
    <td>{user.id}</td>
    <td>{user.isActivated?<button className="btn btn-success rounded-5">Active</button>:<button className="btn btn-danger rounded-5">Not Active</button>}</td>
    <td>{user.userName}</td>
    <td>{user.imagePath?<img style={{
      width: 50,
    }} src={`${BASE_IMG}/${user.imagePath}`}/>:""}</td>
    <td>{user.email}</td>
    <td>{user.country}</td>
    <td>
      {user.isActivated?<i className="fa fa-toggle-on text-success" aria-hidden="true" onClick={()=>toggleActive(user.id)}></i>
:<i className="fa fa-toggle-off text-danger"aria-hidden="true" onClick={()=>toggleActive(user.id)}></i>}
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
          <li className="page-item" key={arraypage} onClick={()=>getuserslist("",6,arraypage)}>
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
  );
}
