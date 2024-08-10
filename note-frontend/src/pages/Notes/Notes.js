import React, { useEffect, useState } from "react";
import SearchOption from "../../components/CreateNoteBar/SearchOption";
import Note from "../../components/Notes/Note";
import Masonry from "react-masonry-css";
import "./note.css";
import { BACKEND_URL } from "../../utils/urls";
import axios from "axios";
import { LuLightbulbOff } from "react-icons/lu";
import Loading from "../../components/shared/Loading";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Cookie from "js-cookie";
import EmptyNote from "../../components/common/EmptyNote";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState("");
  const [controlRender, setControlRender] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!controlRender || controlRender) {
      console.log(`Bearer ${JSON.parse(localStorage.getItem("access_token"))}`);
      axios
        .get(`${BACKEND_URL}/api/v1/notes`, {
          withCredentials: true,
          credentials: "include",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("access_token")) || ""
            }`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          setNotes(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  }, [controlRender]);

  const breakpointColumnsObj = {
    default: 5,
    1100: 5,
    700: 3,
    500: 2,
    400: 2,
  };

  if (isLoading) return <Loading />;

  const pinnedNotes = notes?.filter((note) => note?.isPinned === true);
  const unpinnedNotes = notes?.filter((note) => note?.isPinned === false);

  return (
    <div className="container mx-auto bg-white">
      <div className="my-5">
        <SearchOption
          setControlRender={setControlRender}
          controlRender={controlRender}
        />
      </div>

      {pinnedNotes?.length > 0 && (
        <h1 className="text-xs font-bold uppercase text-stone-400 mb-3">
          Pinned
        </h1>
      )}
      {pinnedNotes?.length > 0 && (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {pinnedNotes?.map((note) => (
            <>
              <Note
                note={note}
                key={note?._id}
                onClick={(id) => setSelectedNoteId(id)}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
                setShowModal={setShowModal}
                showModal={showModal}
                setNotes={setNotes}
                notes={notes}
              />
            </>
          ))}
        </Masonry>
      )}

      {pinnedNotes?.length > 0 && (
        <h1 className="text-xs font-bold uppercase text-stone-400 mb-3 mt-5">
          Others
        </h1>
      )}

      {unpinnedNotes?.length > 0 ? (
        <>
          <DndProvider backend={HTML5Backend}>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {unpinnedNotes?.map((note) => (
                <>
                  <Note
                    note={note}
                    key={note?._id}
                    onClick={(id) => setSelectedNoteId(id)}
                    setNotes={setNotes}
                    selectedNote={selectedNote}
                    setSelectedNote={setSelectedNote}
                    setShowModal={setShowModal}
                    showModal={showModal}
                    controlRender={controlRender}
                    setControlRender={setControlRender}
                    notes={notes}
                  />
                </>
              ))}
            </Masonry>
          </DndProvider>
        </>
      ) : (
        <EmptyNote message="Notes not found!" Icon={LuLightbulbOff} />
      )}
    </div>
  );
};

export default Notes;
