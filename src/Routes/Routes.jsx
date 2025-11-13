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
import TransactionDetails from "../Pages/TransactionDetails/TransactionDetails";
import PrivateRoute from "./PrivateRoute";
import Reports from "../Pages/Reports/Reports";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage/>,
    hydrateFallbackElement: <p className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-xl"></span></p>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'my-profile',
        element: (
          <PrivateRoute>
            <MyProfile/>
          </PrivateRoute>
        )
      },
      {
        path: 'update-profile',
        element: <UpdateProfile/>
      },
      {
        path: 'add-transaction',
        element: (
          <PrivateRoute>
            <AddTransaction/>
          </PrivateRoute>
        )
      },
      {
        path: 'my-transaction',
        element: (
          <PrivateRoute>
            <MyTransaction/>
          </PrivateRoute>
        )
      },
      {
        path: 'transaction-details/:id',
        element:(
          <PrivateRoute>
            <TransactionDetails/>
          </PrivateRoute>
        )
          
      },
      {
        path: 'reports',
        element: (
          <PrivateRoute>
            <Reports/>
          </PrivateRoute>
        )
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
