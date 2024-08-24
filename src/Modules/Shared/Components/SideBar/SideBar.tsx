import { useState } from 'react';
import { Sidebar as Prosidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
export default function SideBar() {
  const[togglecol,Settogglecol]=useState(false)
  const toggle=()=>{
    Settogglecol(!togglecol)
  }
  const logout=()=>{
    localStorage.removeItem("token")
    navigate("/Login")
  }
  const navigate=useNavigate()

  return (
    <>
    <Prosidebar collapsed={togglecol} className='vh-100 position-relative sidebar p-0'>
      <div className='text-center bg-white'>
      <img src='\src\assets\images\nav-logo.png'  />
      </div>
  <Menu>
    <MenuItem icon={<i className="fa-regular fa-user"></i>} component={<Link to="users-list" />}> Users</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-bars-progress"></i>} component={<Link to="project-list" />}> Projects</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-list-check"></i>} component={<Link to="tasks-list" />}> Tasks</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>} onClick={logout}> Logout</MenuItem>
  </Menu>
  <i className="fa-solid fa-circle-chevron-left toggle" onClick={toggle}></i>
</Prosidebar>;
    </>
  )
}
