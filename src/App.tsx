import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
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
import ProjectList from "./Modules/Projects/Components/ProjectList/ProjectList";
import ProjectData from "./Modules/Projects/Components/ProjectData/ProjectData";
import TasksList from "./Modules/Tasks/Components/TasksList/TasksList";
import TasksData from "./Modules/Tasks/Components/TasksData/TasksData";
import UsersList from "./Modules/Users/Components/UsersList/UsersList";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NoData from "./Modules/Shared/Components/NoData/NoData";


function App() {
  const routes = createHashRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <LogIn /> },
        { path: "login", element: <LogIn /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "register", element: <Register /> },
        { path: "change-pass", element: <ChangePass /> },
        { path: "verify-account", element: <VerifyAccount /> },
      ],
    },
    {
      path: "dashboard",
      element: <ProtectedRoute><MasterLayout /></ProtectedRoute>,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "home", element: <Dashboard /> },
        { path: "project-list", element: <ProjectList /> },
        { path: "project-data", element: <ProjectData /> },
        { path: "tasks-list", element: <TasksList /> },
        { path: "tasks-data", element: <TasksData /> },
        { path: "users-list", element: <UsersList /> },
        {path: "nodata", element: <NoData/>}
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer />
    </>
  );
}

export default App;
