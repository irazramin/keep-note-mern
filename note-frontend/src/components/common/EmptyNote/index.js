import React from "react";

const EmptyNote = ({ message, Icon }) => {
  return (
    <div className="text-center mt-20 w-full h-full flex items-center justify-center ">
      <div className="flex items-center justify-center  flex-col">
        <Icon className="font-medium text-[100px] text-stone-500" />
        <h2 className="font-medium text-xl text-stone-500 mt-5">
          {message}
        </h2>
      </div>
    </div>
  );
};

export default EmptyNote;
