import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import {
  faPalette,
  faEllipsisVertical,
  faThumbTack,
  faImage
} from "@fortawesome/free-solid-svg-icons";

import "./note.css";

const Note = ({ note, onClick }) => {
  return (
    <div  className="lg:w-full group modal-button border p-[15px] rounded-md mb-[20px] cursor-pointer hover:shadow single-note relative">
          <label
      htmlFor="my-modal"
    >
      <div>
        <div className="" onClick={() => onClick(note._id)}>
          <h2 className="font-semibold text-base break-words text-stone-800 cursor-pointer">{note.title}</h2>
          <h2 className="text-sm text-wrap w-full break-words mt-2 text-stone-700 cursor-pointer">
              {note.description}
          </h2>
        </div>
      </div>
    </label>
    <div className="mt-3">
          <div className="note-tools flex justify-evenly flex-wrap">
            <div data-tip="background" className="w-[35px] h-[35px] tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800">
              <FontAwesomeIcon className="text-sm" icon={faFolderOpen} />
            </div>
            <div data-tip="archrive" className="w-[35px] h-[35px] tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800">
              <FontAwesomeIcon className="text-sm" icon={faPalette} />
            </div>
            <div data-tip="add image" className="w-[35px] h-[35px] tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800">
              <FontAwesomeIcon className="text-sm" icon={faImage} />
            </div>
            <div data-tip="more" className="w-[35px] h-[35px] tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800">
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
