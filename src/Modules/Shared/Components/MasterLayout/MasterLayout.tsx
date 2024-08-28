import { useEffect } from "react";
import SideBar from '../SideBar/SideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import "./master.css"

export default function MasterLayout() {

  return (
    <>
    <div className='d-flex' >
    <div>
    <SideBar/>
    </div>
      <div className="w-100">
      <NavBar/>
      <Outlet/>
      </div>
    </div>
    </>
  )
}
