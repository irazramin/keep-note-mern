import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

const Navbar = ({ setSidebarOpen, sidebarOpen }) => {
  const pathname = useLocation().pathname;

  return (
    <div className="bg-white p-3 border-b sticky top-0 left-0 z-50">
      <div className="px-2">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-10">
            <div className="!w-[45px] h-[45px]  rounded-full hover:bg-stone-200">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-full h-full text-stone-800"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
            <div className="text-stone-800 font-semibold min-w-[130px] capitalize">
              {pathname.slice(1)}
            </div>
            <div className="form-control w-full">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search…"
                  className="input input-bordered bg-white max-w-xl w-full"
                />
                <button className="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
