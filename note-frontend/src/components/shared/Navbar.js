import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isOpen } from "../../features/slices/sideBarSlice";
import Dropdown from "../common/Dropdown/Dropdown";
import useAuth from "../../hooks/useAuth";
import Cookies from "js-cookie";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = useLocation().pathname;
  const [user, setUser] = useState({});
  const isOpenSidebar = useSelector((state) => state.sideBar.value);
  const authUser = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      setUser(JSON.parse(authUser));
    }
  }, [authUser]);

  return (
    <div className="bg-white p-3 border-b sticky top-0 left-0 z-50">
      <div className="px-2">
        <div className="flex items-center gap-10 justify-between">
          <div className="flex items-center gap-10">
            <div className="!w-[45px] h-[45px]  rounded-full hover:bg-stone-200">
              <button
                onClick={() => {
                  dispatch(isOpen(!isOpenSidebar));
                }}
                className="w-[45px] h-full text-stone-800"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
            <div className="text-stone-800 font-semibold min-w-[130px] capitalize">
              {pathname.split("/")[2]}
            </div>
            <div className="form-control w-full">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search…"
                  className="ring-1 ring-slate-200 focus:ring-primary outline-none bg-white p-4 w-[300px] h-full text-black"
                />
                <button className="bg-primary p-4 active:scale-95 transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
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

          <div>
            <div
              className="w-[50px] h-[50px] cursor-pointer active:scale-90 transition-all"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img src="/images/user.png" className="w-full h-full" />
            </div>
            <div>
              <Dropdown
                className={`${
                  showDropdown ? "block " : "hidden"
                } min-w-[200px] right-5`}
              >
                <div>
                  <div className="flex items-center gap-3 p-3">
                    <div className="text-center">
                      <h3 className="text-stone-800 font-semibold">
                        {user?.firstName} {user?.lastName}
                      </h3>
                      <p className="text-stone-500">{user?.email}</p>
                    </div>
                  </div>
                  <ul className="">
                    <li className="hover:bg-stone-100 rounded-sm text-stone-700 cursor-pointer py-2 px-3 border-b border-b-stone-100">
                      <a href="#">Profile</a>
                    </li>
                    <li className="hover:bg-stone-100 rounded-sm text-stone-700 cursor-pointer py-2 px-3 border-b border-b-stone-100">
                      <a href="#">Settings</a>
                    </li>
                    <li
                      className="hover:bg-stone-100 rounded-sm text-stone-700 cursor-pointer py-2 px-3"
                      onClick={() => {
                        localStorage.removeItem("auth_user");
                        localStorage.removeItem("access_token");

                        window.location.reload();
                      }}
                    >
                      <a href="#">Logout</a>
                    </li>
                  </ul>
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
