import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
const Navbar = ({ setSidebarOpen, sidebarOpen }) => {
  return (
    <div className="bg-white p-3 border-b sticky top-0 left-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center gap-10">
          <div>Keep Note</div>
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered"
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
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="absolute top-3 left-5 w-[45px] h-[45px]  rounded-full focus:bg-stone-200">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
