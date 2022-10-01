import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import {
  faPalette,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

import "./note.css";

const Note = ({ note, onClick }) => {
  return (
    <div  className="lg:w-[200px] modal-button border-[1.4px] p-2 rounded  cursor-pointer hover:shadow-md overflow-hidden single-note">
          <label
      htmlFor="my-modal"
    >
      <div>
        <div className="" onClick={() => onClick(note._id)}>
          <h2 className="font-semibold text-base break-words">{note.title}</h2>
          <h2 className="text-sm text-wrap w-full break-words mt-2">
            {note.description.length > 50
              ? note.description.slice(0, 50)
              : note.description}
          </h2>
        </div>
      </div>
    </label>
    <div className="mt-5">
          <div className="note-tools flex justify-evenly flex-wrap" onClick={() => console.log("000")}>
            <div className="w-[35px] h-[35px] rounded-full hover:bg-gray-200 flex justify-center items-center">
              <FontAwesomeIcon icon={faPalette} />
            </div>
            <div className="w-[35px] h-[35px] rounded-full hover:bg-gray-200 flex justify-center items-center">
              <FontAwesomeIcon icon={faFolderOpen} />
            </div>
            <div className="w-[35px] h-[35px] rounded-full hover:bg-gray-200 flex justify-center items-center">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
          </div>
        </div>
    </div>

  );
};

export default Note;
