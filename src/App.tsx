import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./Modules/Shared/Components/ProtectedRoute/ProtectedRoute";
import AuthLayout from "./Modules/Shared/Components/AuthLayout/AuthLayout";
import NotFound from "./Modules/Shared/Components/NotFound/NotFound";
import LogIn from "./Modules/Authontication/Components/LogIn/LogIn";
import ForgetPass from "./Modules/Authontication/Components/ForgetPass/ForgetPass";
import ResetPass from "./Modules/Authontication/Components/ResetPass/ResetPass";
import Register from "./Modules/Authontication/Components/Register/Register";
import VerifyAccount from "./Modules/Authontication/Components/VerifyAccount/VerifyAccount";
import ChangePass from "./Modules/Authontication/Components/ChangePass/ChangePass";
import MasterLayout from "./Modules/Shared/Components/MasterLayout/MasterLayout";
import Dashboard from "./Modules/Dashboard/Dashboard";
import TasksList from "./Modules/Tasks/Components/TasksList/TasksList";
import TasksData from "./Modules/Tasks/Components/TasksData/TasksData";
import UsersList from "./Modules/Users/Components/UsersList/UsersList";
import NavBar from "./Modules/Shared/Components/NavBar/NavBar";
import SideBar from "./Modules/Shared/Components/SideBar/SideBar";
import { ToastContainer } from "react-toastify";
import ProjectsList from "./Modules/Projects/Components/ProjectList/ProjectList";
import ProjectsData from "./Modules/Projects/Components/ProjectData/ProjectData";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <LogIn /> },
        { path: "login", element: <LogIn /> },
        { path: "forget-password", element: <ForgetPass /> },
        { path: "reset-password", element: <ResetPass /> },
        { path: "register", element: <Register /> },
        { path: "change-password", element: <ChangePass /> },
        { path: "verify-account", element: <VerifyAccount /> },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "home", element: <Dashboard /> },
        { path: "projects-list", element: <ProjectsList /> },
        { path: "projects-data", element: <ProjectsData /> },
        { path: "tasks-list", element: <TasksList /> },
        { path: "tasks-data", element: <TasksData /> },
        { path: "users-list", element: <UsersList /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
