/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { TLoginUser, TregisterUser } from "./auth.interface";
import config from "../../config";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createToken } from "../../utils/verifyJWT";

const registerUserDb = async (file: any, payload: TregisterUser) => {
  // check if the user is exist

  if (file) {
    const imageName = `${Math.random() * 5 + Date.now() + payload.name}`;
    const path = String(file?.path);
    const { secure_url }: any = await sendImageToCloudinary(imageName, path);
    payload.profilePhoto = secure_url;
  }

  const user = await User.isUserExistsByEmail(payload.email);
  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user already exist");
  }

  const newUser = await User.create(payload);

  const tokenPayload = {
    _id: newUser?._id,
    name: newUser?.name,
    email: newUser?.email,
    phoneNumber: newUser?.phoneNumber,
    role: newUser?.role,
  };
  const accessToken = createToken(tokenPayload, config.accessTokenSecret as string, config.accessTokenExpiresIn as string);
  const refreshToken = createToken(tokenPayload, config.jwtRefreshSecret as string, config.refreshTokenExpireIn as string);
  return {
    accessToken,
    refreshToken,
  };
};
const loginToDb = async (payload: TLoginUser) => {
  // check if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }
  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  const tokenPayload = {
    _id: user?._id,
    name: user?.name,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    role: user?.role,
  };
  const accessToken = createToken(tokenPayload, config.accessTokenSecret as string, config.accessTokenExpiresIn as string);
  const refreshToken = createToken(tokenPayload, config.jwtRefreshSecret as string, config.refreshTokenExpireIn as string);
  return {
    accessToken,
    refreshToken,
  };
};

const refreshTokenDb = async (token: string) => {
  const decoded = jwt.verify(token, config.jwtRefreshSecret as string) as JwtPayload;
  const { email, iat } = decoded;
  const user = await User.isUserExistsByEmail(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }
  if (user.passwordChangedAt && User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }
  const tokenPayload = {
    _id: user?._id,
    name: user?.name,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    role: user?.role,
  };
  const accessToken = createToken(tokenPayload, config.accessTokenSecret as string, config.accessTokenExpiresIn as string);
  return accessToken;
};
export const authServices = {
  registerUserDb,
  loginToDb,
  refreshTokenDb,
};
