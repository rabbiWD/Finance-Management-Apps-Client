import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <NavBar />
        <div className="mt-4">
          <Outlet></Outlet>
        </div>
        <Footer/>
      </div>
      <Toaster/>
    </div>
  );
};

export default MainLayout;
