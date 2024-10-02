import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { TLoginUser, TregisterUser } from "./auth.interface";
import { USER_ROLE } from "../User/user.constant";
import { createToken } from "../../utils/verifyJWT";
import config from "../../config";

const registerUserDb = async (payload: TregisterUser) => {
  // check if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);
  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user already exist");
  }
  payload.role = USER_ROLE.USER;
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
export const authServices = {
  registerUserDb,
  loginToDb,
};
