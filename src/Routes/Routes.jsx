import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import Home from "../Pages/Home/Home";
import AddTransaction from "../Pages/AddTransaction/AddTransaction";
import MyProfile from "../Pages/MyProfile/MyProfile";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import MyTransaction from "../Pages/MyTransaction/MyTransaction";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage/>,
    // hydrateFallbackElement: <p className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-xl"></span></p>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'my-profile',
        element: <MyProfile/>
      },
      {
        path: 'update-profile',
        element: <UpdateProfile/>
      },
      {
        path: 'add-transaction',
        element: <AddTransaction/>
      },
      {
        path: 'my-transaction',
        element: <MyTransaction/>
      },
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
]);
