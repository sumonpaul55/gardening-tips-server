import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { TregisterUser } from "./auth.interface";
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

export const authServices = {
  registerUserDb,
};
