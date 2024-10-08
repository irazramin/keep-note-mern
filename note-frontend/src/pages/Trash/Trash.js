import React from "react";
import { GetTrashNote } from "../../hooks/TrashHooks";
import Masonry from "react-masonry-css";
import TrashNote from "../../components/Notes/TrashNote";
import EmptyNote from "../../components/common/EmptyNote";
import { LuLightbulbOff } from "react-icons/lu";

const Trash = () => {
  const { setTrashes, trashes } = GetTrashNote();

  const breakpointColumnsObj = {
    default: 5,
    1100: 5,
    700: 3,
    500: 2,
  };

  return (
    <div className="my-3">
      {trashes?.length > 0 ? (
        <div className="">
          {
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {trashes?.map((note) => (
                <>
                  <TrashNote
                    key={note?._id}
                    note={note.noteId}
                    trash={true}
                    setNotes={setTrashes}
                    trashData={note}
                  />
                </>
              ))}
            </Masonry>
          }
        </div>
      ) : (
        <EmptyNote message="Trash not found!" Icon={LuLightbulbOff} />
      )}
    </div>
  );
};

export default Trash;
