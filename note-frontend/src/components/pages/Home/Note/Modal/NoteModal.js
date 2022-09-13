import React, { useEffect, useState } from "react";

const NoteModal = ({ singleNote, showModal }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [collapseCard, setCollapseCard] = useState(false);

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="card   bg-base-100 shadow-md w-[40%] mx-auto">
          <div className="card-body p-4">
            <p>{singleNote[0]?.title}</p>
            <input
              type="text"
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
              className="focus:outline-none font-bold p-1"
              value={title ? title :  singleNote[0]?.title}
            />
            <input
              // ref={titleRef}
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              placeholder="title"
              className="focused p-1 focus:outline-none mt-1"
              value={desc ? desc : singleNote[0]?.description}
            />
       
            <div className="card-actions justify-between items-center">
              <button
                // onClick={submitNote}
                className="btn btn-ghost"
              >
                Done
              </button>
              <div className="modal-action  mt-0" >
                <label htmlFor="my-modal"  className="btn btn-ghost">
                  Close
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteModal;
