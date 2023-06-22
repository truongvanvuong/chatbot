const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const existingUser = await User.findOne({ username: req.body.username });
    const existingUserEmail = await User.findOne({ email: req.body.email });

    if (existingUser) {
      res.status(400).json("Tên người dùng đã tại");
    } else if (existingUserEmail) {
      res.status(401).json("Email đã được đăng ký");
    } else {
      const user = await newUser.save();
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    // if no user

    !user && res.status(400).json("No user");

    // if same user then compare password

    const validate = await bcrypt.compare(req.body.password, user.password);

    // if not validate
    if (!validate) {
      return res.status(401).json("Wrong Credentials");
    }

    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(400).json(error);
  }
});
module.exports = router;
