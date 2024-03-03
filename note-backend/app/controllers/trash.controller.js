const { User, Trash, Note } = require("../models");
module.exports.getAllTrashNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    const query = {
      userId: userId,
      isDeleted: true,
    };

    if (!user) return res.status(404).json({ message: "User not found" });

    const trashes = await Trash.find(query).populate([
      {
        path: "noteId",
        model: "Note",
      },
    ]);

    return res
      .status(200)
      .json({ message: "Trashes fetched successfully", data: trashes });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.restoredNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const trashId = req.params.trashId;
    const user = await User.findById(userId);
    const trash = await Trash.findById(trashId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!trash)
      return res.status(404).json({ message: "Trash note not found" });

    const restoredNote = await Note.findByIdAndUpdate(
      trash.noteId._id,
      { isDeleted: false },
      { new: true }
    );

    const deleteTrashNote = await Trash.findByIdAndDelete(trashId);

    return res.status(200).json({
      message: "Note restore successful",
      data: { deleteTrashNote, restoredNote },
    });
  } catch (error) {
    return res.status(500).json({ message: "Bad request" });
  }
};

module.exports.deleteForever = async (req, res) => {
  try {
    const trashId = req.params.trashId;
    const trash = await Trash.findById(trashId);

    if (!trash) return res.status(404).json({ message: "Trash not found" });

    const noteDelete = await Note.findByIdAndDelete(trash.noteId);

    if (!noteDelete)
      return res.status(404).json({ message: "Can not delete note" });

    const trashNoteDelete = await Trash.findByIdAndDelete(trashId);

    return res
      .status(200)
      .json({
        message: "Note delete successfully",
        data: { noteDelete, trashNoteDelete },
      });
  } catch (error) {
    return res.status(500).json({ message: "Bad request" });
  }
};
