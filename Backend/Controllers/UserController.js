import asyncHandler from "express-async-handler"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


//
const authUser = asyncHandler(
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user===null) {
      res.status(401).json({"message":"Invalid Password or Email"});
      throw new Error("Invalid  email or password");
    } else {
      const validate = await bcrypt.compare(password, user.password);
      if (validate) {
        const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
          expiresIn: "10hr",
        });
        res.cookie("token", token, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 36000),
          httpOnly: true,
          sameSite: "none",
          secure:true
        });
        res.status(200).json({ success: true, message: user, token: token });
    }else {
        res.status(401).json({"message":"Invalid Password or Email"});
        throw new Error("Invalid email or password");
      }
    }
  })
);

// user logout
const logout = asyncHandler(
  asyncHandler(async (req, res) => {
    res.clearCookie('token')
    req.cookies.token=''
    res.status(200).json({"success":true ,"message":"logout successfully"})
      })
);

//Post user --> register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(req.body);
  if (!email || !name || !password) {
    throw new Error("provide all details during registeration ...");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }
  const hashedpassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedpassword
  });
  const user = await newUser.save();
  res.status(200).json({"success":true,"message":user})
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      "success":true,"message":user });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//get user by id 
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findOne({"_id" : req.params.id}).select("-password");
  if (user) {
    res.json({"success":true,"message":user});
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export{
  authUser,
  registerUser,
  getUserProfile,
  logout,
  getUserById,
};