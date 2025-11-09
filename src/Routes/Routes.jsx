import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Register from "../Pages/Auth/Register";


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
    path: '/auth/register',
    element: <Register></Register>
  }
]);