const { User, Archive, Note } = require("../models");

module.exports.getAllArchive = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    const notes = await Archive.find({
      userId: userId,
      isArchive: true,
    }).populate([
      {
        path: "noteId",
        model: "Note",
      },
    ]);

    if (!user) return res.status(404).json({ message: "User not found!" });
    if (!notes) return res.status(404).json({ message: "Notes not found!" });

    return res.status(200).json({
      data: notes,
      message: "Archive data fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.restoreArchiveNote = async (req, res) => {
  try {
    const userId = req.user.id;
    const archiveId = req.params.archiveId;

    const user = await User.findById(userId);
    const archive = await Archive.findById(archiveId);

    if (!user) return res.status(404).json({ message: "User not found!" });
    if (!archive)
      return res.status(404).json({ message: "Archive note not found!" });

    const deleteArchiveNote = await Archive.findByIdAndDelete(archiveId);

    const updateNote = await Note.findByIdAndUpdate(
      archive.noteId._id,
      { isArchive: false },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Note restore successfully", data: updateNote });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
