import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    // children: [
    //     {
    //         index:true,
    //         element: 
    //     }
    // ]
  },
  {
    path: '/auth/login',
    element: <Login></Login>
  },
  {
    path: '/auth/register',
    element: <Register></Register>
  }
]);