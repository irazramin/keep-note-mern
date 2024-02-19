import React, { useEffect, useState } from "react";
import Note from "../../pages/Home/Note/Note";
import { BACKEND_URL } from "../../../utils/urls";
import Masonry from "react-masonry-css";

const PinnedNote = ({
  setControlRender,
  controlRender,
  showModal,
  setShowModal,
  selectedNote,
  setSelectedNote,
  pinnedNotes, setPinnedNotes
}) => {
  const breakpointColumnsObj = {
    default: 5,
    1100: 5,
    700: 3,
    500: 2,
  };

  return (
    <>
      {pinnedNotes?.length > 0 && (
        <h4 className="font-semibold text-xs mb-3 uppercase text-zinc-400">
          Pinned Notes
        </h4>
      )}

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
              setNotes={setPinnedNotes}
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
  );
};

export default PinnedNote;
