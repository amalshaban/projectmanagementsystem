import { useEffect, useState } from "react";
import { Sidebar as Prosidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { AuthorizedToken, USERS_URLs } from "../../../../constans/END_POINTS";
import axios from "axios";
export default function SideBar() {
  const [togglecol, Settogglecol] = useState(false);
  const toggle = () => {
    Settogglecol(!togglecol);
  };
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState("");
  const getUserData = async () => {
    try {
      const response = await axios.get(USERS_URLs.currentUser,{headers:AuthorizedToken});
      setUserRole(response.data.group.name);
      console.log(userRole);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
    return () => {};
  }, []);

  return (
    <>
      <Prosidebar
        collapsed={togglecol}
        className=" position-relative sidebar p-0 "
      >
        <Menu className="my-5">
          <MenuItem
            icon={<i className="fa-regular fa-user"></i>}
            component={<Link to="home" />}
          >
            {" "}
            Home
          </MenuItem>
          {userRole === 'Manager'?
           <MenuItem
           icon={<i className="fa-regular fa-user"></i>}
           component={<Link to="users-list" />}
         >
           {" "}
           Users
         </MenuItem>
         : ""
         }
         
          <MenuItem
            icon={<i className="fa-solid fa-bars-progress"></i>}
            component={<Link to="project-list" />}
          >
            {" "}
            Projects
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-list-check"></i>}
            component={<Link to="tasks-list" />}
          >
            {" "}
            Tasks
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}
            onClick={logout}
          >
            {" "}
            Logout
          </MenuItem>
        </Menu>
        <i
          className="fa-solid fa-circle-chevron-left toggle"
          onClick={toggle}
        ></i>
      </Prosidebar>
      ;
    </>
  );
}
