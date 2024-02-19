import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../../../utils/urls";

const NoteModal = ({ selectedNoteId, onSubmit, selectedNote, setSelectedNote }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/v1/note/${selectedNoteId}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data[0]?.title ?? '');
        setDescription(data[0]?.description ?? '');
      });
  }, [selectedNoteId]);

  const updateNote = () => {
    const updateNote = {
      title: title,
      description: description,
    };

    fetch(`${BACKEND_URL}/api/v1/note/${selectedNoteId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateNote),
    })
      .then((res) => res.json())
      .then((data) => {
        onSubmit(true);
      });
  };

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="card  bg-white shadow-md w-[40%] mx-auto">
          <div className="card-body p-4">
            <input
              type="text"
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
              className="focus:outline-none font-bold p-1 text-stone-800"
              value={title}
            />
            <input
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="title"
              className="focused p-1 focus:outline-none mt-1 text-stone-800"
              value={description}
            />

            <div className="card-actions modal-action justify-between items-center" onClick={() => setSelectedNote(null)}>
              <button htmlFor="my-modal"  onClick={updateNote} className="px-4 py-2 text-stone-800 hover:bg-slate-100 rounded-md uppercase font-semibold text-sm">
                Done
              </button>
              
              <button className="modal-action mt-0" onClick={() => setSelectedNote(null)}>
                <label htmlFor="my-modal" className="px-4 py-2 text-stone-800 hover:bg-slate-100 rounded-md uppercase font-semibold text-sm">
                  Close
                </label>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteModal;
