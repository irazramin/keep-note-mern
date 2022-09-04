const express = require('express');

module.exports = {
    middleware: (app) => {
        app.use(express.json())
    }
}