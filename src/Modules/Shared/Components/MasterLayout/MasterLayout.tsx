
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

export default function MasterLayout() {
  return (
    <>
    <SideBar/>
    <NavBar/>
    <Outlet/>
    </>
  )
}
