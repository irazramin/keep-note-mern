import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import {
  faPalette,
  faEllipsisVertical,
  faThumbTack,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

import "./note.css";
import Dropdown from "../../../common/Dropdown/Dropdown";
import { colors } from "./utils/colors";
import { BACKEND_URL } from "../../../../utils/urls";

const Note = ({ note, onClick }) => {
  const [showDropdown, setShowDropdown] = useState({});

  const handleDropdown = (type) => {
    setShowDropdown({ ...showDropdown, [type]: !showDropdown[type] });
    console.log(type);
  };

  const handleSelectColor = (color) => {
    axios.put(`${BACKEND_URL}/api/v1/note/${note._id}`, {
      backgroundColor: color.color,
    });
  };
  return (
    <div style={{ backgroundColor: note?.backgroundColor }} className="lg:w-full group modal-button border px-[15px] pt-[10px] pb-1 rounded-md mb-[20px] cursor-pointer hover:shadow single-note relative">
      <label htmlFor="my-modal">
        <div>
          <div className="" onClick={() => onClick(note._id)}>
            <h2 className="font-semibold text-base break-words text-stone-800 cursor-pointer">
              {note.title}
            </h2>
            <h2 className="text-sm text-wrap w-full break-words mt-2 text-stone-800 cursor-pointer">
              {note.description}
            </h2>
          </div>
        </div>
      </label>
      <div className="mt-3">
        <div className="note-tools flex justify-evenly flex-wrap">
          <div
            data-tip="archrive"
            className="w-[35px] h-[35px] relative tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800"
          >
            <FontAwesomeIcon className="text-sm" icon={faFolderOpen} />
          </div>
          <div
            onClick={() => handleDropdown("color")}
            data-tip="background"
            className="w-[35px] h-[35px] relative tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800"
          >
            <FontAwesomeIcon className="text-sm" icon={faPalette} />
            <Dropdown
              className={`${
                showDropdown["color"] ? "block" : "hidden"
              } min-w-[318px]`}
            >
              <div>
                <ul className="flex items-center gap-3 flex-wrap">
                  {colors.map((color) => {
                    return (
                      <li
                        key={color.id}
                        onClick={() => handleSelectColor(color)}
                        style={
                          {
                            backgroundColor: `${color?.color}`
                          }
                        }
                        className={`w-8 h-8 rounded-full ring-2 ring-transparent hover:ring-slate-800 p-1 transition-all cursor-pointer`}
                      ></li>
                    );
                  })}
                </ul>
              </div>
            </Dropdown>
          </div>
          <div
            data-tip="add image"
            className="w-[35px] h-[35px] tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800"
          >
            <FontAwesomeIcon className="text-sm" icon={faImage} />
          </div>
          <div
            data-tip="more"
            className="w-[35px] h-[35px] tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800"
          >
            <FontAwesomeIcon className="text-sm" icon={faEllipsisVertical} />
          </div>
        </div>
        <div className="absolute top-[10px] right-[10px] hover:text-stone-800 group-hover:block hidden">
          <FontAwesomeIcon icon={faThumbTack} />
        </div>
      </div>
    </div>
  );
};

export default Note;
