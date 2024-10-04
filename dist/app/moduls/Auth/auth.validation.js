"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("../User/user.constant");
const registerUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "User Name is required" }).trim(),
        role: zod_1.z.nativeEnum(user_constant_1.USER_ROLE).optional(),
        email: zod_1.z.string({ required_error: "Email is required" }).email({ message: "Please provide an valid email" }),
        phoneNumber: zod_1.z.string({ required_error: "phone number need" }),
        password: zod_1.z.string({ required_error: "Password is required" }),
        profilePhoto: zod_1.z.string().optional(),
    }),
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        role: zod_1.z.nativeEnum(user_constant_1.USER_ROLE).optional(),
        email: zod_1.z.string().email({ message: "Please provide an valid email" }).optional(),
        phoneNumber: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        profilePhoto: zod_1.z.string().optional(),
    }),
});
const loginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required to login" }).email({ message: "Provide a valid email" }),
        password: zod_1.z.string({ required_error: "Password is required to login" }),
    }),
});
const refreshTokenValidation = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh token is required!",
        }),
    }),
});
exports.authValidation = {
    registerUserValidationSchema,
    updateUserValidationSchema,
    loginValidation,
    refreshTokenValidation,
};
