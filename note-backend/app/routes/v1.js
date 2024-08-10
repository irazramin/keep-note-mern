const express = require("express");
const noteControllers = require("../controllers/note.controllers");
const { register, login } = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const {
  getAllTrashNotes,
  restoredNote,
  deleteForever,
} = require("../controllers/trash.controller");
const {
  getAllArchive,
  restoreArchiveNote,
} = require("../controllers/archive.controller");
const router = express.Router();

// auth
router.post("/registration", register);
router.post("/login", login);

// note
router.get("/notes", verifyToken, noteControllers.index);
router.post("/note", verifyToken, noteControllers.store);
router.get("/note/:id", verifyToken, noteControllers.show);
router.put("/archive/:noteId", verifyToken, noteControllers.archiveNote);
router.put("/note/:id", verifyToken, noteControllers.update);
router.delete("/note/:id", verifyToken, noteControllers.delete);

// pin note
router.put("/pin-note/:id", verifyToken, noteControllers.pinNote);
router.get("/pinned-note", verifyToken, noteControllers.getPinnedNotes);

// trash
router.get("/trash-note", verifyToken, getAllTrashNotes);
router.post("/trash/restore-note/:trashId", verifyToken, restoredNote);
router.delete("/trash/delete-forever/:trashId", verifyToken, deleteForever);

// archive
router.get("/archive-note", verifyToken, getAllArchive);
router.put("/archive/restore-note/:archiveId", verifyToken, restoreArchiveNote);

module.exports = router;
