import React from "react";
import { GetArchiveNotes } from "../../hooks/ArchiveHook";
import EmptyNote from "../../components/common/EmptyNote";
import { LuLightbulbOff } from "react-icons/lu";
import Masonry from "react-masonry-css";
import ArchiveNote from "../../components/Notes/ArchiveNote";

const Archive = () => {
  const { archiveNotes, setArchiveNotes } = GetArchiveNotes();

  const breakpointColumnsObj = {
    default: 5,
    1100: 5,
    700: 3,
    500: 2,
  };

  return (
    <div className="my-3">
      {archiveNotes?.length > 0 ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {archiveNotes?.map((note) => (
            <>
              <ArchiveNote
                note={note?.noteId}
                key={note?._id}
                archiveId={note?._id}
                setNote={setArchiveNotes}
              />
            </>
          ))}
        </Masonry>
      ) : (
        <EmptyNote message="Archive not found!" Icon={LuLightbulbOff} />
      )}
    </div>
  );
};

export default Archive;
