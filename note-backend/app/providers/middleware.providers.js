const express = require('express');
const cors = require('cors');
module.exports = {
    middleware: (app) => {
        app.use(express.json())
        app.use(cors());
    }
}