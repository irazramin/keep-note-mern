import React from "react";
import { FaSearch } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 bg-white w-full h-full flex items-center justify-center flex-col">
      <FaSearch className="text-[100px] text-stone-600 font-bold" />
      <p className="text-xl text-stone-700 font-medium">Looking for notes..</p>
    </div>
  );
};

export default Loading;
