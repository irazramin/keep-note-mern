import React, { useEffect, useState } from "react";
import SearchOption from "../../components/CreateNoteBar/SearchOption";
import Note from "../../components/Notes/Note";
import Masonry from "react-masonry-css";
import "./note.css";
import { BACKEND_URL } from "../../utils/urls";
import axios from "axios";
const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState("");
  const [controlRender, setControlRender] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!controlRender || controlRender) {
      fetch(`${BACKEND_URL}/api/v1/note`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setNotes(data);
        });
    }
  }, [controlRender]);

  const breakpointColumnsObj = {
    default: 5,
    1100: 5,
    700: 3,
    500: 2,
  };

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
        </>
      ) : (
        <div className="text-center mt-20">
          <h2>No notes found!</h2>
        </div>
      )}
    </div>
  );
};

export default Notes;
