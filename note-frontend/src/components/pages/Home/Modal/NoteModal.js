import React, { useEffect, useState } from "react";

const NoteModal = ({ singleNote, showModal }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="flex flex-col">
            <input
              type="text"
              value={singleNote[0]?.title}
              placeholder="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="focus:outline-none font-bold p-1 focus:outline-none text-start"
            />
            <input
              value={singleNote[0]?.description}
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              placeholder="title"
              className="focused focus:outline-none p-1 focus:outline-none mt-2"
            />
          </div>
          <div className="card-actions justify-between">
            {/*<button  className="btn btn-ghost">Done</button>*/}
            {/*<button className="btn btn-ghost">Close</button>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
