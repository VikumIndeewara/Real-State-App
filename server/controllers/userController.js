import { User } from "../Models/UserModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({
    message: "Api is working",
  });
};

export const update = async (req, res) => {
  try {
    const updateData = {};

    if (req.body.username) {
      updateData.username = req.body.username;
    }
    if (req.body.email) {
      updateData.email = req.body.email;
    }
    if (req.body.avatar) {
      updateData.avatar = req.body.avatar;
    }
    if (req.body.password) {
      updateData.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const { id } = req.params;
    const updateResult = await User.findByIdAndUpdate(
      id,
      {
        $set:updateData
      },
      { new: true }
    );

    if (!updateResult) {
      return res.status(400).json({ message: "User not found" });
    }
    const { password, ...rest } = updateResult._doc;
    const token = jwt.sign({ id: updateResult._id }, process.env.JWT_SECRET);
    res
      .cookie("new_access_token", token, { httpOnly: true , maxAge: 24 * 60 * 60 * 1000 }) //httpOnly prevent access of other third party applications, we can set cookie expire time also
      .status(200)
      .json(rest);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
