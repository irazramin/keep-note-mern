import React, { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../../utils/urls";
import { PiArchiveBoxBold } from "react-icons/pi";
import { IoColorPaletteOutline } from "react-icons/io5";
import Dropdown from "../common/Dropdown/Dropdown";
import { FaRegImage } from "react-icons/fa";
import { LuUserPlus2 } from "react-icons/lu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../utils/colors";
import axios from "axios";
import Cookies from "js-cookie";

const SearchOption = ({ setControlRender, controlRender }) => {
  const [collapseCard, setCollapseCard] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const descriptionRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState({});
  const [selectedColor, setSelectedColor] = useState("");

  const handleCardCollapse = () => {
    setCollapseCard(true);
  };

  const handleDropdown = (e, type) => {
    e.stopPropagation();
    setShowDropdown({ ...showDropdown, [type]: !showDropdown[type] });
    console.log(type);
  };

  const submitNote = () => {
    if (!title && !desc) {
      setCollapseCard(false);
      return;
    }

    if (title || desc) {
      const data = {
        title: title,
        description: desc,
        backgroundColor: selectedColor,
      };
      axios
        .post(`${BACKEND_URL}/api/v1/note`, data, {
          withCredentials: true,
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        })
        .then((response) => {
          setControlRender(!controlRender);
        });
    }

    setCollapseCard(false);
    setTitle("");
    setDesc("");
    setSelectedColor("");
  };

  const handleSelectColor = (e, color) => {
    e.stopPropagation();
    setSelectedColor(color.color);
  };

  useEffect(() => {
    if (collapseCard) descriptionRef.current.focus();
  }, [descriptionRef]);
  return (
    <div className="bg-white">
      {!collapseCard ? (
        <div
          onClick={handleCardCollapse}
          className="card card-side rounded py-3 px-5 shadow-md lg:w-[40%] w-[80%] mx-auto bg-white"
        >
          <p className="font-semibold text-base text-stone-800">
            Take a note.....
          </p>
        </div>
      ) : (
        <div
          style={{ backgroundColor: `${selectedColor}` }}
          className={`rounded-[6px] shadow-md lg:w-[40%] w-full mx-auto bg-[${selectedColor}]`}
        >
          <div className="p-4 h-fit">
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              className="focus:outline-none p-1 text-stone-800 placeholder:text-stone-600 bg-transparent w-full"
            />
            <textarea
              ref={descriptionRef}
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              placeholder="Take a note....."
              cols={5}
              className="focused p-1 focus:outline-none mt-1 text-stone-800 placeholder:text-stone-500 bg-transparent w-full h-auto resize-none"
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
              <button
                onClick={submitNote}
                className="px-4 py-2 text-stone-800 hover:bg-slate-100 rounded-md uppercase font-semibold text-sm"
              >
                Done
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
      )}
    </div>
  );
};

export default SearchOption;
