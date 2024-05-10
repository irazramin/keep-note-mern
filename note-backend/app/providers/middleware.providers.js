const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

module.exports = {
  middleware: (app) => {
    const corsOptions = {
      origin: ["http://localhost:3000", "http://localhost:3001", "https://keep-notes-mern.vercel.app"],
      credentials: true,
      optionSuccessStatus: 200,
    };
    app.set("trust proxy", 1);
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());

    app.use(cors(corsOptions));
  },
};
