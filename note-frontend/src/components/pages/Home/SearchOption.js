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
    <div className="bg-white">
      {!collapseCard ? (
        <div
          onClick={handleCardCollapse}
          className="card card-side rounded py-3 px-5 shadow-md lg:w-[40%] w-[80%] mx-auto bg-white"
        >
          <p className="font-semibold text-base text-stone-800">Take a note.....</p>
        </div>
      ) : (
        <div className="card rounded-[6px] shadow-md lg:w-[40%] w-[80%] mx-auto bg-white">
          <div className="card-body p-4">
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              className="focus:outline-none p-1 text-stone-800 placeholder:text-stone-600 "
            />
            <input
              ref={titleRef}
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              placeholder="Take a note....."
              className="focused p-1 focus:outline-none mt-1 text-stone-800 placeholder:text-stone-500"
            />
            <div className="card-actions justify-between mt-2">
              <button onClick={submitNote} className="px-4 py-2 text-stone-800 hover:bg-slate-100 rounded-md uppercase font-semibold text-sm">
                Done
              </button>
              <button
                onClick={() => setCollapseCard(false)}
                className="px-4 py-2 text-stone-800 hover:bg-slate-100 rounded-md uppercase font-semibold text-sm"
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
