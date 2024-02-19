import React from "react";
import logo from "../../../../logo.svg";
import { Link, useLocation } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { PiArchiveBoxBold } from "react-icons/pi";
import { PiTrashBold } from "react-icons/pi";
import { PiLightbulbBold } from "react-icons/pi";

const Dashboard = ({ sidebarOpen }) => {
  const pathname = useLocation().pathname;
  const sidebarItems = [
    {
      id: 1,
      name: "Notes",
      Icon: PiLightbulbBold,
      link: "/notes",
    },
    {
      id: 2,
      name: "Archrive",
      Icon: PiArchiveBoxBold,
      link: "/archrive",
    },
    {
      id: 3,
      name: "Trash",
      Icon: PiTrashBold,
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
          <li key={item.id} className={`text-stone-800 hover:bg-slate-100 px-[30px] rounded-tr-3xl rounded-br-3xl ${item.link === pathname ? 'bg-rose-200' : ''}`}>
            <div className="py-4">
              <Link to={item.link}>
                <div className="flex items-center">
                  <span className="mr-5 text-stone-800">
                    <item.Icon className="text-xl w-5" />
                  </span>
                  <p
                    className={`text-[14px]  font-semibold ${
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
