import mongoose, { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
  _id?: string;
  name: string;
  role?: keyof typeof USER_ROLE;
  email: string;
  follower?: mongoose.Schema.Types.ObjectId[];
  following?: mongoose.Schema.Types.ObjectId[];
  upVotesItem?: mongoose.Schema.Types.ObjectId[];
  downVotesItem?: mongoose.Schema.Types.ObjectId[];
  verified?: boolean;
  password: string;
  passwordChangedAt?: Date;
  phoneNumber?: string;
  profilePhoto?: string;
  createdAt?: Date;
  updatedAt?: Date;
  links?: {
    socialName?: string;
    url?: string;
  }[];
  address?: string;
};

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(id: string): Promise<TUser>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(passwordChangedTimestamp: Date, jwtIssuedTimestamp: number): boolean;
}
