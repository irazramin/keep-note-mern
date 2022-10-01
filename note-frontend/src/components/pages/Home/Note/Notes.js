import React, { useEffect, useState } from "react";
import SearchOption from "../SearchOption";
import NoteModal from "./Modal/NoteModal";
import Note from "./Note";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [controlRender, setControlRender] = useState(false);

  useEffect(() => {
    getNotes();
  }, [controlRender]);

  const getNotes = () => {
    fetch(`http://localhost:4000/api/v1/note`)
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
      });
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="mb-5">
        <SearchOption
          setControlRender={setControlRender}
          controlRender={controlRender}
        />
      </div>

      {notes.length > 0 ? (
        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-x-10 gap-y-7 flex-wrap">
          {notes.map((note) => (
            <>
              <Note
                note={note}
                key={note._id}
                onClick={(id) => setSelectedNoteId(id)}
              />
            </>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20">
          <h2>No notes found!</h2>
        </div>
      )}
      <NoteModal selectedNoteId={selectedNoteId} onSubmit={(value) => value ? getNotes() : ''} />
    </div>
  );
};

export default Notes;
