import { USER_ROLE } from "./../moduls/User/user.constant";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import AppError from "../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";

type TTokenElements = {
  _id?: string;
  name: string;
  email: string;
  role: keyof typeof USER_ROLE | undefined;
  phoneNumber?: string | undefined;
};

export const createToken = (JwtPayload: TTokenElements, secret: string, expireIn: string) => {
  return jwt.sign(JwtPayload, secret, {
    expireIn,
  });
};

export const verifyToken = (token: string, secret: string): JwtPayload | Error => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error: any) {
    throw new AppError(401, "You are not authorized");
  }
};
