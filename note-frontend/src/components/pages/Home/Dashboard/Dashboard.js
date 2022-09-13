import React from "react";
import logo from "../../../../logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faFolderOpen } from "@fortawesome/free-regular-svg-icons";

const Dashboard = ({ sidebarOpen }) => {
  return (
    <div
      className={`duration-200  top-[72px] px-[30px] ${
        sidebarOpen ? "sidebar-open" : "sidebar"
      }`}
    >
      <ul className="icons w-full flex flex-col justify-center">
        <li className=" ">
          <div className="py-3">
            <Link to="note">
              <div className="flex items-center">
                {" "}
                <span className="mr-5">
                <FontAwesomeIcon icon={faLightbulb} className="text-xl" />  
                </span>
                <p
                  className={`text-[13px]  font-semibold ${
                    sidebarOpen ? "" : "sidebar-title"
                  }`}
                >
                  Notes
                </p>
              </div>
            </Link>
          </div>
        </li>
        <li className="">
          <div>
            <Link to="archrive">
              <div className="flex items-center">
                {/* <img className="w-[35px] h-[35px]" src={logo} alt="" /> */}
                <span className="mr-5">
                  <FontAwesomeIcon icon={faFolderOpen} />
                </span>
                <p
                  className={`text-[13px] font-semibold  ${
                    sidebarOpen ? "" : "sidebar-title"
                  }`}
                >
                  Archrive
                </p>
              </div>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
