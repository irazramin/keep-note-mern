const { User } = require("../models");
const passport = require("../../configs/passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) return res.status(400).send("User already registered.");

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const username =
      req.body.firstName +
      req.body.lastName +
      "_" +
      Math.floor(Math.random() * 1000);

    req.body.username = username;

    const newUser = new User(req.body);
    await newUser.save();

    return res
      .status(201)
      .json({ message: "User registered successfully.", data: newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(404).json({ message: "Invalid email or password" });

    passport.authenticate(
      "local",
      { session: false },
      async (error, user, info) => {
        if (error) return next(error);

        if (!user) return res.status(403).json({ message: info.message });

        const payload = {
          id: user._id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        const token = jwt.sign(payload, "secret", { expiresIn: "7d" });

        let cookieConfig;

        // if (process.env.NODE_ENV === "development") {
        //   cookieConfig = {
        //     maxAge: 604800000,
        //   };
        // } else {
        //   cookieConfig = {
        //     sameSite: "none",
        //     secure: true,
        //     domain: ".onrender.com",
        //     httpOnly: true,
        //   };
        // }
        // res.cookie("access_token", token, {
        //   maxAge: 604800000,
        // });

        res.cookie("auth_user", JSON.stringify(payload), {
          maxAge: 604800000,
        });

        res.cookie("access_token", token, {
          maxAge: 604800000,
        });

        delete user.password;

        return res
          .status(200)
          .json({ message: "Login successful", data: user });
      }
    )(req, res, next);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
