import React, { useRef, useState } from "react";
import axios from "axios";
import { PiTrashBold } from "react-icons/pi";
import "../../../pages/Notes/note.css";
import { LiaTrashRestoreAltSolid } from "react-icons/lia";
import { BACKEND_URL } from "../../../utils/urls";

const TrashNote = ({ note = null, setNotes = null, trashData = {} }) => {
  const noteRef = useRef(null);

  const handleRestoredNote = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/trash/restore-note/${id}`,
        {},
        {
          withCredentials: true,
          credential: "include",
        }
      );

      setNotes((prev) => {
        return prev.filter((note) => note?._id !== id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteForever = async (e, id) => {
    e.stopPropagation();

    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/v1/trash/delete-forever/${id}`,
        {
          withCredentials: true,
          credential: "include",
        }
      );
      setNotes((prev) => {
        return prev.filter((note) => note?._id !== id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <div
        ref={noteRef}
        style={{ backgroundColor: note?.backgroundColor }}
        className={`lg:w-full group modal-button border px-[15px] pt-[10px] pb-1 rounded-md mb-[20px] cursor-pointer hover:shadow-gray-200 hover:shadow-md single-note relative 
      `}
      >
        <label className="transition-all duration-300">
          <div>
            <div className="">
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
              onClick={(e) => handleDeleteForever(e, trashData?._id)}
              data-tip="Delete forever"
              className="w-[35px] h-[35px] tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800"
            >
              <PiTrashBold className="text-lg" />
            </div>
            <div
              onClick={(e) => handleRestoredNote(e, trashData?._id)}
              data-tip="Restored"
              className="w-[35px] h-[35px] tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800"
            >
              <LiaTrashRestoreAltSolid className="text-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrashNote;
