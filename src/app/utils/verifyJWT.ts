/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import AppError from "../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { USER_ROLE } from "../moduls/User/user.constant";

type TTokenElements = {
  _id?: string;
  name: string;
  email: string;
  phoneNumber?: string | undefined;
  role: keyof typeof USER_ROLE | undefined;
};

export const createToken = (tokenPayload: TTokenElements, secret: string, expireIn: string) => {
  return jwt.sign(tokenPayload, secret, { expiresIn: expireIn });
};

export const verifyToken = (token: string, secret: string): JwtPayload | Error => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error: any) {
    throw new AppError(401, "You are not authorized");
  }
};
