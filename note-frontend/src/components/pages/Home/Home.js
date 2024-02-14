import React, { useState } from "react";
import SearchOption from "./SearchOption";
import "./Home.css";
import { Outlet } from "react-router";
import Dashboard from "./Dashboard/Dashboard";

const Home = ({ sidebarOpen }) => {
  return (
    <>
      <div className="mx-auto bg-white ">
        <div className="w-full flex">
          <div
            className={`bg-white h-[calc(100vh-73px)] ${
              sidebarOpen ? "w-[280px] duration-200" : "w-[80px] duration-200"
            }`}
          >
            <Dashboard sidebarOpen={sidebarOpen} />
          </div>
          <div className="flex-1 px-5        max-w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
