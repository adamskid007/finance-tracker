import asyncHandler from "../../utils/asyncHandler.js";
import { loginUser, registerUser } from "./auth.service.js";

export const registerController = asyncHandler(async (req,res) => {
    const user = await registerUser(req.body);

    res.status(201).json({
        success: true,
        message: "user registered successfully",
        data: user,
    });
});

export const loginController = asyncHandler(async (req,res) => {
    const result = await loginUser(req.body);

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
    })
})