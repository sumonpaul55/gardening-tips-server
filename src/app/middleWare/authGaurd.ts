import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { verifyToken } from "../utils/verifyJWT";
import config from "../config";
import { USER_ROLE } from "../moduls/User/user.constant";
import { User } from "../moduls/User/user.model";

const authGaurd = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // check if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Your are not authorized");
    }
    const decoded = verifyToken(token, config.accessTokenSecret as string) as JwtPayload;

    const { role, email } = decoded;
    // check if the use is exist
    const user = await User.isUserExistsByEmail(email);
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Your are not eligible for this operation");
    }

    // checking
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Your are not authorized");
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default authGaurd;
