import React from "react";
import logo from "../../../../logo.svg";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Dashboard = ({ sidebarOpen }) => {
  const pathname = useLocation().pathname;
  const sidebarItems = [
    {
      id: 1,
      name: "Notes",
      icon: faLightbulb,
      link: "/notes",
    },
    {
      id: 2,
      name: "Archrive",
      icon: faFolderOpen,
      link: "/archrive",
    },
    {
      id: 3,
      name: "Trash",
      icon: faTrash,
      link: "/trash",
    },
  ];
  return (
    <div
      className={`duration-200 bg-white top-[72px] ${
        sidebarOpen ? "sidebar-open" : "sidebar"
      }`}
    >
      <ul className="icons w-full flex flex-col justify-center ">
        {sidebarItems.map((item) => (
          <li key={item.id} className={`text-stone-800 hover:bg-rose-200 px-[30px] rounded-tr-3xl rounded-br-3xl ${item.link === pathname ? 'bg-rose-200' : ''}`}>
            <div className="py-3">
              <Link to={item.link}>
                <div className="flex items-center">
                  <span className="mr-5 text-stone-800">
                    <FontAwesomeIcon icon={item.icon} className="text-lg w-5" />
                  </span>
                  <p
                    className={`text-[13px]  font-semibold ${
                      sidebarOpen ? "" : "sidebar-title"
                    }`}
                  >
                    {item.name}
                  </p>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
