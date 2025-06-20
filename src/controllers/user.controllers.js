import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { generateSessionToken } from "../services/auth.js";

const registerUser = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  // Checking each field is not empty
  if (!fullName || !username || !email || !password) {
    return res.status(400).json({
      message: "All Fields are required",
    });
  }

  // checking user exists
  let existedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    return res.render("register");
  }
  // password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user

  const newUser = new User({
    username,
    fullName,
    email,
    password: hashedPassword,
  });

  // generate Session Token
  await newUser.save();
  let token = generateSessionToken(newUser._id);

  res.cookie("sessionid", token);
  res
    .redirect("/")
    .status(201)
    .json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // get a user with given data

    let user = await User.findOne({ email });

    let hashedPassword = user.password;

    let isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordCorrect) res.send("invalid password or email");

    let token = generateSessionToken(user);
    res.cookie("sessionid", token);
    res.redirect("/");
  } catch (error) {}
};

const logoutUser = async (req, res) => {
  res.clearCookie("sessionid");

  res.redirect("/user/login");
};
export { registerUser, loginUser, logoutUser };
