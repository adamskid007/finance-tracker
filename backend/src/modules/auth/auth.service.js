import bcrypt from "bcrypt";
import prisma from "../../config/prisma.js";
import { loginSchema, registerSchema } from "./auth.validator.js";
import AppError from "../../utils/AppError.js";
import { generateToken } from "../../utils/jwt.js";


export const registerUser = async (userData) => {
    const validatedData = registerSchema.parse(userData);
    const existingUser = await prisma.user.findUnique({where: {
        email: validatedData.email,
    },})
    if(existingUser){
        throw new AppError("Email already exists",409)
    }
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await prisma.user.create({
        data: {
            name: validatedData.name,
            email: validatedData.email,
            password: hashedPassword,
        },
    });
    return{
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
    };
};


export const loginUser = async (loginData) => {
    const validatedData = loginSchema.parse(loginData);
    
    const user = await prisma.user.findUnique({
        where: {
            email: validatedData.email,
        },
    })

    if (!user) {
        throw new AppError("Invalid Email or password", 401);
    }

    const passwordMatch = await bcrypt.compare(validatedData.password, user.password);

    if(!passwordMatch) {
        throw new AppError("Invalid Email or Password", 401);
    }

    const token = generateToken(user.id);

    return{
        token, 
        user: {
            id: user.id,
            name: user.name,
            email:user.email,
        },
    }
};