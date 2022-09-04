const express = require('express');
const kernel = require("./app/kernel");
const app = express();

kernel.boot(app);

module.exports = {
    app
}