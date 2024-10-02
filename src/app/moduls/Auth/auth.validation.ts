import { z } from "zod";
import { USER_ROLE } from "../User/user.constant";

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "User Name is required" }),
    role: z.nativeEnum(USER_ROLE).optional(),
    email: z.string({ required_error: "Email is required" }).email({ message: "Please provide an valid email" }),
    phoneNumber: z.string({ required_error: "phone number need" }),
    password: z.string({ required_error: "Password is required" }),
    profilePhoto: z.string({ required_error: "Profile image is missing" }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.nativeEnum(USER_ROLE).optional(),
    email: z.string().email({ message: "Please provide an valid email" }).optional(),
    phoneNumber: z.string().optional(),
    password: z.string().optional(),
    profilePhoto: z.string().optional(),
  }),
});

const loginValidation = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required to login" }).email({ message: "Provide a valid email" }),
    password: z.string({ required_error: "Password is required to login" }),
  }),
});

export const authValidation = {
  registerUserValidationSchema,
  updateUserValidationSchema,
  loginValidation,
};
