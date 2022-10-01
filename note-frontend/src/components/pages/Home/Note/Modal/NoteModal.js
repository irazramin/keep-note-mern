import React, { useEffect, useState } from "react";

const NoteModal = ({ selectedNoteId, onSubmit }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch(`http://localhost:4000/api/v1/note/${selectedNoteId}`)
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

    fetch(`http://localhost:4000/api/v1/note/${selectedNoteId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify(updateNote),
    })
      .then((res) => res.json())
      .then((data) => {
        onSubmit(true);
        console.log(data);
      });
  };

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="card   bg-base-100 shadow-md w-[40%] mx-auto">
          <div className="card-body p-4">
            <p>{title}</p>
            <input
              type="text"
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
              className="focus:outline-none font-bold p-1"
              value={title}
            />
            <input
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="title"
              className="focused p-1 focus:outline-none mt-1"
              value={description}
            />

            <div className="card-actions justify-between items-center">
              <button onClick={updateNote} className="btn btn-ghost">
                Done
              </button>
              <button className="modal-action  mt-0">
                <label htmlFor="my-modal" className="btn btn-ghost">
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
