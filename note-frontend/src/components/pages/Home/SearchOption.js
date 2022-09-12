import React, { useRef, useState } from "react";

const SearchOption = ({ setControlRender, controlRender }) => {
  const [collapseCard, setCollapseCard] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const titleRef = useRef(null);

  const handleCardCollapse = () => {
    setCollapseCard(true);
  };

  const submitNote = () => {
    fetch(`http://localhost:4000/api/v1/note`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: desc,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setControlRender(!controlRender);
      });
  };
  return (
    <div>
      {!collapseCard ? (
        <div
          onClick={handleCardCollapse}
          className="card card-side rounded py-3 px-5 bg-base-100 shadow-md w-[40%] mx-auto"
        >
          <p className="font-semibold text-base">Take a note.....</p>
        </div>
      ) : (
        <div className="card   bg-base-100 shadow-md w-[40%] mx-auto">
          <div className="card-body p-4">
            <input
              type="text"
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
              className="focus:outline-none font-bold p-1 focus:outline-none"
            />
            <input
              ref={titleRef}
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              placeholder="title"
              className="focused focus:outline-none p-1 focus:outline-none mt-1"
            />
            <div className="card-actions justify-between">
              <button onClick={submitNote} className="btn btn-ghost">
                Done
              </button>
              <button
                onClick={() => setCollapseCard(false)}
                className="btn btn-ghost"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchOption;
