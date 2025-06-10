import { User } from "../models/user.models.js";

const registerUser = async (req, res) => {
  const { fullName, username, email, password, avatar } = req.body;
};

export { registerUser };
