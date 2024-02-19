import React, { useEffect, useState } from "react";
import SearchOption from "../SearchOption";
import NoteModal from "./Modal/NoteModal";
import Note from "./Note";
import Masonry from "react-masonry-css";
import "./note.css";
import { BACKEND_URL } from "../../../../utils/urls";
import Modal from "../../../common/Modal/Modal";
const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState("");
  const [controlRender, setControlRender] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getNotes();
  }, [controlRender]);

  const getNotes = () => {
    fetch(`${BACKEND_URL}/api/v1/note`)
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
      });
  };

  const breakpointColumnsObj = {
    default: 5,
    1100: 5,
    700: 3,
    500: 2,
  };

  return (
    <div className="container mx-auto bg-white">
      <div className="my-5">
        <SearchOption
          setControlRender={setControlRender}
          controlRender={controlRender}
        />
      </div>

      {notes?.length > 0 ? (
        <>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {notes?.map((note) => (
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
      {/* <NoteModal
        selectedNoteId={selectedNoteId}
        onSubmit={(value) => (value ? getNotes() : "")}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
      /> */}

   
    </div>
  );
};

export default Notes;
