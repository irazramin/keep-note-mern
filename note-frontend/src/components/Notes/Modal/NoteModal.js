import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../utils/urls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { LuUserPlus2 } from "react-icons/lu";
import { FaRegImage } from "react-icons/fa";
import { colors } from "../../../utils/colors";
import Dropdown from "../../common/Dropdown/Dropdown";
import { IoColorPaletteOutline } from "react-icons/io5";
import { PiArchiveBoxBold } from "react-icons/pi";

const NoteModal = ({
  selectedNoteId,
  onSubmit,
  selectedNote,
  setSelectedNote,
}) => {
  const [showDropdown, setShowDropdown] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/v1/note/${selectedNoteId}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data[0]?.title ?? "");
        setDescription(data[0]?.description ?? "");
        setSelectedColor(data[0]?.backgroundColor ?? "");
      });
  }, [selectedNoteId]);
  
  const updateNote = () => {
    const updateNote = {
      title: title,
      description: description,
      backgroundColor: selectedColor,
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

      setSelectedNote(null);
  };

  const handleDropdown = (e, type) => {
    e.stopPropagation();
    setShowDropdown({ ...showDropdown, [type]: !showDropdown[type] });
    console.log(type);
  };

  const handleSelectColor = (e, color) => {
    e.stopPropagation();
    setSelectedColor(color.color);
  };

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div style={{backgroundColor: `${selectedColor}`}} className="bg-white shadow-md w-[40%] mx-auto rounded-md">
          <div className="p-4">
            <input
              type="text"
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
              className="focus:outline-none font-bold p-1 text-stone-800 bg-transparent w-full"
              value={title}
            />
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="title"
              className="focused p-1 focus:outline-none mt-1 text-stone-800 h-fit break-words bg-transparent w-full resize-none overflow-hidden"
              value={description}
            />

            <div className="card-actions justify-between mt-2">
              <div className="flex justify-around flex-wrap gap-5">
                <div
                  data-tip="archrive"
                  className="w-[35px] h-[35px] relative tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800"
                >
                  <PiArchiveBoxBold className="text-xl" />
                </div>
                <div
                  onClick={(e) => handleDropdown(e, "color")}
                  data-tip="background"
                  className="w-[35px] h-[35px] relative tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800"
                >
                  <IoColorPaletteOutline className="text-xl" />
                  <Dropdown
                    className={`${
                      showDropdown["color"] ? "block" : "hidden"
                    } min-w-[370px]`}
                  >
                    <div>
                      <ul className="flex items-center gap-2 flex-wrap">
                        {colors.map((color) => {
                          return (
                            <li
                              key={color.id}
                              onClick={(e) => handleSelectColor(e, color)}
                              style={{
                                backgroundColor: `${color?.color}`,
                              }}
                              className={`w-8 h-8 rounded-full ring-2 ring-transparent hover:ring-slate-800 p-1 transition-all cursor-pointer`}
                            ></li>
                          );
                        })}
                      </ul>
                    </div>
                  </Dropdown>
                </div>
                <div
                  data-tip="add image"
                  className="w-[35px] h-[35px] tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800"
                >
                  <FaRegImage className="text-lg" />
                </div>
                <div
                  data-tip="collaborators"
                  className="w-[35px] h-[35px] tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800"
                >
                  <LuUserPlus2 className="text-lg" />
                </div>
                <div
                  data-tip="more"
                  className="w-[35px] h-[35px] tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800"
                >
                  <FontAwesomeIcon
                    className="text-sm"
                    icon={faEllipsisVertical}
                  />
                </div>
              </div>
              <button className="modal-action mt-0" onClick={updateNote}>
                <label htmlFor="my-modal" className="px-4 py-2 text-stone-800 hover:bg-slate-100 rounded-md uppercase font-semibold text-sm">
                  Done
                </label>
              </button>
              {/* <button
                onClick={() => setCollapseCard(false)}
                className="px-4 py-2 text-stone-800 hover:bg-slate-100 rounded-md uppercase font-semibold text-sm"
              >
                Close
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteModal;
