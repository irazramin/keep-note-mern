import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import {
  faPalette,
  faEllipsisVertical,
  faThumbTack
} from "@fortawesome/free-solid-svg-icons";

import "./note.css";

const Note = ({ note, onClick }) => {
  return (
    <div  className="lg:w-[200px] modal-button border p-2 rounded  cursor-pointer hover:shadow overflow-hidden single-note relative">
          <label
      htmlFor="my-modal"
    >
      <div>
        <div className="" onClick={() => onClick(note._id)}>
          <h2 className="font-semibold text-base break-words text-stone-800">{note.title}</h2>
          <h2 className="text-sm text-wrap w-full break-words mt-2 text-stone-700">
            {note.description.length > 50
              ? note.description.slice(0, 50)
              : note.description}
          </h2>
        </div>
      </div>
    </label>
    <div className="mt-5">
          <div className="note-tools flex justify-evenly flex-wrap">
            <div className="w-[35px] h-[35px] rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800">
              <FontAwesomeIcon icon={faPalette} />
            </div>
            <div className="w-[35px] h-[35px] rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800">
              <FontAwesomeIcon icon={faFolderOpen} />
            </div>
            <div className="w-[35px] h-[35px] rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
          </div>
          <div className="absolute top-[10px] right-[10px] hover:text-stone-800">
             <FontAwesomeIcon icon={faThumbTack} />
          </div>
        </div>
    </div>

  );
};

export default Note;
