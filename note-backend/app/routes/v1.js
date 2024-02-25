const express = require('express');
const noteControllers = require("../controllers/note.controllers");
const { register, login } = require('../controllers/auth.controller');
const router = express.Router();

// auth 
router.post('/registration', register);
router.post('/login', login)

router.get('/note', noteControllers.index);
router.post('/note', noteControllers.store);
router.get('/note/:id', noteControllers.show);
router.put('/note/:id', noteControllers.update);
router.delete('/note/:id', noteControllers.delete);

router.put('/pin-note/:id', noteControllers.pinNote);
router.get('/pinned-note', noteControllers.getPinnedNotes);



module.exports = router;