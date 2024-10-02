import { z } from "zod";
import { USER_ROLE } from "../User/user.constant";

const registerUserValidationSchema = z.object({
  name: z.string({ required_error: "User Name is required" }),
  role: z.nativeEnum(USER_ROLE).optional(),
  email: z.string({ required_error: "Email is required" }).email({ message: "Please provide an valid email" }),
  phoneNumber: z.string({ required_error: "phone number need" }),
  password: z.string({ required_error: "Password is required" }),
  profilePhoto: z.string({ required_error: "Profile image is missing" }),
});

const updateUserValidationSchema = z.object({
  name: z.string().optional(),
  role: z.nativeEnum(USER_ROLE).optional(),
  email: z.string().email({ message: "Please provide an valid email" }).optional(),
  phoneNumber: z.string().optional(),
  password: z.string().optional(),
  profilePhoto: z.string().optional(),
});

export const authValidation = {
  registerUserValidationSchema,
  updateUserValidationSchema,
};
