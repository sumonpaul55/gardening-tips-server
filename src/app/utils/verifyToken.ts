/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import AppError from "../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
export const verifyToken = (token: string, secret: string): JwtPayload | Error => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error: any) {
    throw new AppError(401, "You are not authorized");
  }
};
