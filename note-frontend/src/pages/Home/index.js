import React, { useState } from "react";
import SearchOption from "../../components/CreateNoteBar/SearchOption";
import "./Home.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/shared/Sidebar";
import { useSelector } from "react-redux";
import Navbar from "../../components/shared/Navbar";

const Index = () => {
  const isOpenSidebar = useSelector((state) => state.sideBar.value);
  return (
    <>
      <Navbar />
      <div className="mx-auto bg-white">
        <div className="w-full flex">
          <div
            className={`bg-white h-[calc(100vh-73px)] ${
              isOpenSidebar ? "w-[280px] duration-200" : "w-[80px] duration-200"
            }`}
          >
            <Sidebar />
          </div>
          <div
            className={`flex-1 h-[calc(100vh-73px)] ${
              !isOpenSidebar
                ? "left-[80px] w-[calc(100%-80px)]"
                : "left-[280px] w-[calc(100%-280px)]"
            }  absolute px-5`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
