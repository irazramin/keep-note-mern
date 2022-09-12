import React, { useState } from "react";
import SearchOption from "./SearchOption";
import Notes from "./Note/Notes";
import "./Home.css";
import logo from "../../../logo.svg";
import { Outlet } from "react-router";

const Home = () => {
  const [controlRender, setControlRender] = useState(false);
  return (
    <>
      <div className="m-10 w-full mx-auto">
        <SearchOption
          setControlRender={setControlRender}
          controlRender={controlRender}
        />


        <div className="w-[50px] sidebar duration-200 bg-white h-screen absolute top-[72px] p-[10px]">
        <ul className="icons w-full flex flex-col justify-center">
          <li className="flex py-10 justify-center">
            {" "}
            <img className="w-[30px]" src={logo} alt="" />
            <a className="sidebar-title" href="#">SDASKDJLAKSDK</a>
          </li>
          <li className="flex py-10 justify-center">
            {" "}
            <img className="w-[30px]" src={logo} alt="" />
            <a className="sidebar-title" href="#">SDASKDJLAKSDK</a>
          </li>

          <li className="flex py-10 justify-center">
            {" "}
            <img className="w-[30px]" src={logo} alt="" />
            <a className="sidebar-title" href="#">SDASKDJLAKSDK</a>
          </li>

          <li className="flex py-10 justify-center">
            {" "}
            <img className="w-[30px]" src={logo} alt="" />
            <a className="sidebar-title" href="#">SDASKDJLAKSDK</a>
          </li>

          <li className="flex py-10 justify-center">
            {" "}
            <img className="w-[30px]" src={logo} alt="" />
            <a className="sidebar-title" href="#">SDASKDJLAKSDK</a>
          </li>

          <li className="flex py-10 justify-center">
            {" "}
            <img className="w-[30px]" src={logo} alt="" />
            <a className="sidebar-title" href="#">SDASKDJLAKSDK</a>
          </li>
        </ul>

      </div>

        <Notes controlRender={controlRender} />
      </div>
    </>
  );
};

export default Home;
