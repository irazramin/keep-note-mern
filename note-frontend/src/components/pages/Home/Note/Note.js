import React, { useRef, useState } from "react";
import NoteModal from "./Modal/NoteModal";

const Note = ({ note, showNotes, singleNote, showModal }) => {
  return (
    <label
      htmlFor="my-modal"
      onClick={() => showNotes(note._id)}
      className="lg:w-[200px]  modal-button border-[1.4px] p-2 rounded pb-10  cursor-pointer hover:shadow-md"
    >
      <div >
        <div className="">
          <h2 className="font-semibold text-base break-words">{note.title}</h2>
          <h2 className="text-sm text-wrap w-full break-words mt-2">
            {note.description.length > 50 ? note.description.slice(0,50) : note.description}
          </h2>
        </div>

       
      </div>
    </label>
  );
};

export default Note;
