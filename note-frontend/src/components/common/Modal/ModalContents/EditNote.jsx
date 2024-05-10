import React, { useEffect, useState } from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
import { PiArchiveBoxBold } from "react-icons/pi";
import Dropdown from "../../Dropdown/Dropdown";
import { colors } from "../../../../utils/colors";
import { FaRegImage } from "react-icons/fa";
import { LuUserPlus2 } from "react-icons/lu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BACKEND_URL } from "../../../../utils/urls";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { timeAgo } from "../../../../utils/timeAgo";
import axios from "axios";
import Cookies from "js-cookie";

const EditNote = ({
  note,
  setShowModal,
  showModal,
  setSelectedNote,
  selectedNote,
  setNotes
}) => {
  const [showDropdown, setShowDropdown] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  console.log(selectedNote);
  const updateNote = () => {
    const updateNote = {
      title: title,
      description: description,
      backgroundColor: selectedColor,
    };

    axios.put(`${BACKEND_URL}/api/v1/note/${selectedNote?._id}`, updateNote, 
      { withCredentials: true, credentials: "include", headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        } }
    ).then((res) => {
      setNotes((prev) => {
        return prev.map((item) => {
          if (item._id === selectedNote?._id) {
            return { ...item, ...updateNote };
          }
          return item;
        });
      });
    });
    setSelectedNote(null);
    setShowModal(false);
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

  useEffect(() => {
    setTitle(selectedNote?.title);
    setDescription(selectedNote?.description);
    setSelectedColor(selectedNote?.backgroundColor);
  }, [selectedNote]);
  return (
    <div
      style={{ backgroundColor: `${selectedColor}` }}
      className="bg-white p-3 h-full w-full rounded-md"
    >
      <div className="">
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

        <p className="text-end mt-2 text-stone-800 font-medium text-xs">Edited: {timeAgo(selectedNote?.updatedAt)}</p>
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
              <FontAwesomeIcon className="text-sm" icon={faEllipsisVertical} />
            </div>
          </div>
          <button className="modal-action mt-0" onClick={updateNote}>
            <label
              htmlFor="my-modal"
              className="px-4 py-2 text-stone-800 hover:bg-slate-100 rounded-md uppercase font-semibold text-sm cursor-pointer"
            >
              Done
            </label>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
