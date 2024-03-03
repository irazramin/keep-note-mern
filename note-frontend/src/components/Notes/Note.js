import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faEllipsisVertical,
  faThumbTack,
} from "@fortawesome/free-solid-svg-icons";
import { PiTrashBold } from "react-icons/pi";
import { PiArchiveBoxBold } from "react-icons/pi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa";
import { LuUserPlus2 } from "react-icons/lu";
import { TbDropletOff } from "react-icons/tb";

import "../../pages/Notes/note.css";
import Dropdown from "../common/Dropdown/Dropdown";
import { colors } from "../../utils/colors";
import { BACKEND_URL } from "../../utils/urls";
import Modal from "../common/Modal/Modal";
import EditNote from "../common/Modal/ModalContents/EditNote";
import { LiaTrashRestoreAltSolid } from "react-icons/lia";
const Note = ({
  note = null,
  onClick,
  setNotes = null,
  selectedNote,
  setSelectedNote = null,
  showModal,
  setShowModal = null,
  controlRender,
  setControlRender = null,
  trash = false,
  trashData = {},
}) => {
  const noteRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState({});
  const handleDropdown = (e, type) => {
    e.stopPropagation();
    setShowDropdown({ ...showDropdown, [type]: !showDropdown[type] });
    console.log(type);
  };
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleSelectColor = (e, color) => {
    console.log(color);
    e.stopPropagation();
    axios
      .put(
        `${BACKEND_URL}/api/v1/note/${note._id}`,
        {
          backgroundColor: color.color,
        },
        { withCredentials: true, credentials: "include" }
      )
      .then((res) => {
        setNotes((prev) => {
          return prev.map((item) => {
            if (item._id === note._id) {
              return { ...item, backgroundColor: color.color };
            }
            return item;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRestoredNote = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/trash/restore-note/${id}`,
        {},
        {
          withCredentials: true,
          credential: "include",
        }
      );

      setNotes((prev) => {
        return prev.filter((note) => note?._id !== id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteForever = async (e, id) => {
    e.stopPropagation();

    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/v1/trash/delete-forever/${id}`,
        {
          withCredentials: true,
          credential: "include",
        }
      );
      setNotes((prev) => {
        return prev.filter((note) => note?._id !== id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNoteClick = (item) => {
    setSelectedNote(item);
    setShowModal(true);
    console.log(item);
    // setOffset({
    //   x: noteRef.current.getBoundingClientRect().top,
    //   y: noteRef.current.getBoundingClientRect().left,
    // });
    // localStorage.setItem("notePosition", JSON.stringify({
    //   x: noteRef.current.getBoundingClientRect().top,
    //   y: noteRef.current.getBoundingClientRect().left,
    // }));
  };

  const handleNotePinned = (e, id) => {
    e.stopPropagation();
    axios
      .put(
        `${BACKEND_URL}/api/v1/pin-note/${id}`,
        {
          isPinned: !note.isPinned,
        },
        { withCredentials: true, credentials: "include" }
      )
      .then((res) => {
        setNotes((prev) => {
          return prev.map((item) => {
            if (item._id === note._id) {
              return { ...item, isPinned: !note.isPinned };
            }
            return item;
          });
        });
        setControlRender(!controlRender);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteNote = async (id) => {
    try {
      const res = await axios.delete(`${BACKEND_URL}/api/v1/note/${id}`, {
        withCredentials: true,
        credentials: "include",
      });

      setNotes((prev) => {
        return prev.filter((note) => note?._id !== id);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative">
      <div
        ref={noteRef}
        onMouseLeave={() => setShowDropdown({})}
        onClick={() => handleNoteClick(note)}
        style={{ backgroundColor: note?.backgroundColor }}
        className={`lg:w-full group modal-button border px-[15px] pt-[10px] pb-1 rounded-md mb-[20px] cursor-pointer hover:shadow-gray-200 hover:shadow-md single-note relative 
      ${selectedNote?._id === note._id ? "opacity-0" : "opacity-100"}
      `}
      >
        <label className="transition-all duration-300">
          <div>
            <div className="" onClick={() => onClick(note._id)}>
              <h2 className="font-semibold text-base break-words text-stone-800 cursor-pointer">
                {note.title}
              </h2>
              <h2 className="text-sm text-wrap w-full break-words mt-2 text-stone-800 cursor-pointer">
                {note.description}
              </h2>
            </div>
          </div>
        </label>
        <div className="mt-3">
          <div className="note-tools flex justify-evenly flex-wrap">
            {!trash ? (
              <>
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
                        <li
                          onClick={(e) =>
                            handleSelectColor(e, { color: "#ffffff" })
                          }
                          className="w-8 h-8 rounded-full ring-1 ring-slate-200 p-1 transition-all cursor-pointer text-slate-800 flex items-center justify-center text-xl"
                        >
                          <TbDropletOff />
                        </li>

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
                  onClick={(e) => handleDropdown(e, "more")}
                  className="w-[35px] h-[35px] tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800"
                >
                  <FontAwesomeIcon
                    className="text-sm"
                    icon={faEllipsisVertical}
                  />
                  {showDropdown["more"] && (
                    <Dropdown className={`min-w-[150px]`}>
                      <ul>
                        <li
                          onClick={() => handleDeleteNote(note?._id)}
                          className={`text-[13px] font-semibold text-stone-700 capitalize py-2 px-3 hover:bg-gray-100 cursor-pointer transition-all text-start`}
                        >
                          Delete
                        </li>
                        <li
                          className={`text-[13px] font-semibold text-stone-700 capitalize py-2 px-3 hover:bg-gray-100 cursor-pointer transition-all text-start`}
                        >
                          Make a copy
                        </li>
                      </ul>
                    </Dropdown>
                  )}
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={(e) => handleDeleteForever(e, trashData?._id)}
                  data-tip="Delete forever"
                  className="w-[35px] h-[35px] tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800"
                >
                  <PiTrashBold className="text-lg" />
                </div>
                <div
                  onClick={(e) => handleRestoredNote(e, trashData?._id)}
                  data-tip="Restored"
                  className="w-[35px] h-[35px] tooltip rounded-full hover:bg-gray-200 flex justify-center items-center text-stone-800"
                >
                  <LiaTrashRestoreAltSolid className="text-lg" />
                </div>
              </>
            )}
          </div>
          {!trash && (
            <div
              onClick={(e) => handleNotePinned(e, note?._id)}
              className={`absolute top-[10px] right-[10px] hover:text-stone-800 group-hover:block hidden  ${
                note?.isPinned ? "text-stone-800" : "text-stone-500"
              }`}
            >
              <FontAwesomeIcon icon={faThumbTack} />
            </div>
          )}
        </div>
      </div>
      <div className="relative">
        <Modal showModal={showModal}>
          <EditNote
            setShowModal={setShowModal}
            showModal={showModal}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            setNotes={setNotes}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Note;
