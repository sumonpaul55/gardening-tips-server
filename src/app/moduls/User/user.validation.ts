import { z } from "zod";
import mongoose from "mongoose";

export const userSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  role: z.enum(["ADMIN", "USER"]).optional(),
  email: z.string().email("Invalid email address"),
  follower: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
  following: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
  upVotesItem: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
  downVotesItem: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().optional(),
  profilePhoto: z.string().url("Invalid URL").optional(),
});

export type TUser = z.infer<typeof userSchema>;

export const userSchemaUpdate = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required").optional(),
  role: z.enum(["ADMIN", "USER"]).optional(),
  email: z.string().email("Invalid email address").optional(),
  follower: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
  following: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
  upVotesItem: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
  downVotesItem: z.array(z.instanceof(mongoose.Types.ObjectId)).optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  phoneNumber: z.string().optional(),
  profilePhoto: z.string().url("Invalid URL").optional(),
});
