const express = require('express');
const noteControllers = require("../controllers/note.controllers");
const router = express.Router();

router.get('/note', noteControllers.index);
router.post('/note', noteControllers.store);
router.get('/note/:id', noteControllers.show);
router.put('/note/:id', noteControllers.update);
router.delete('/note/:id', noteControllers.delete);

module.exports = router;