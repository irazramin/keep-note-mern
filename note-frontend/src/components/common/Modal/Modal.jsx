import React from "react";

const Modal = ({ children, showModal, setShowModal }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-stone-900 bg-opacity-5 z-50">
        <div
      className={`w-[500px] min-h-[180px] bg-white shadow-sm rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5`}
    >
      {children}
    </div>
    </div>
  );
};

export default Modal;