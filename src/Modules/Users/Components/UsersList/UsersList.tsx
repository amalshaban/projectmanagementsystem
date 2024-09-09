import { useEffect, useState } from "react";
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
        "https://upskilling-egypt.com:3003/api/v1/Users/Manager", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
        params: { userName: userName, pageSize: pageSize, pageNumber: pageNumber }
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
  };
  useEffect(() => {
    getuserslist("", 10, 1);
  }, []);



  const [valuename, Setvaluename] = useState("");
  const handelchange = (input: any) => {
    Setvaluename(input.target.value);
    getuserslist(valuename, 10, 1);
    console.log(getuserslist(valuename, 10, 1));
  };
  return (
    <>
      <div className="d-flex  px-2 py-3 bg-white justify-content-between">
        <h3>users</h3>
      </div>
      <div className=" px-2 py-3">
        <div className="row">
          <input
            className="form-control me-2 "
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handelchange}
          />
        </div>

        {/* <div className="p-2 d-flex justify-content-between "> */}
          <div className="p-2 d-flex justify-content-between">
            {userlist.length > 0 ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Email</th>
                    <th scope="col">Country</th>

                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {userlist.map((user: any) => (
                    <tr key={user.id}>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>{user.country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className='nodataproject'>< NoData /></div>

            )}
          </div>


        {/* </div> */}
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            {arrayogpage.map((arraypage) => {
              return (
                <li
                  className="page-item"
                  key={arraypage}
                  onClick={() => getuserslist(valuename, 4, arraypage)}
                >
                  <a className="page-link">{arraypage}</a>
                </li>
              );
            })}

            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
