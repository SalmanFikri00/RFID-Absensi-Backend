import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import generateToken from "../utils/generateJwt.js";

const register = asyncHandler(async (req, res) => {
    const data = req.body;
    const { email } = data;
    console.log(data);
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        res.json({
            status: "error",
            massage: ` error email ${data.email} already exists`,
        });
    }

    const user = await User.create(data);

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            status: "success",
            massage: "data inputed",
            dataInputed: data,
        });
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && user.matchPasswords(password)) {
        generateToken(res, user._id);
        res.status(201).json({
            status: "success",
            massage: "login successful",
        });
    } else {
        res.status(404).json({ 
            status: "failed",
            massage: "email or password incorrect",
        });
    }
});

const logout = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({
        massage: "logout succes",
    });
});

const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        massage: "connected",
        user: req.user,
    });
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    const emailExist = User.findOne({ email: req.body.email });

    if (emailExist && user.email !== req.body.email) {
        res.status(400).json({ massage: "Email already exists", status: "error" });
    } else {
        if (user) {
            user.username = req.body.username || user.username;
            user.kelas = req.body.kelas || user.kelas;
            user.nomor = req.body.nomor || user.nomor;
            user.email = req.body.email || user.email;
            console.log(user.email);

            user.save();
            res.status(200).json({
                status: "success",
                massage: "update successful",
                user: user,
            });
        }
    }
});

export { authUser, register, updateUserProfile, getUserProfile, logout };
