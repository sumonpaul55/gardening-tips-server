import { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request } from "express";
import { USER_ROLE } from "../moduls/User/user.constant";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";

const authGaurd = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // check if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Your are not authorized");
    }
    const decoded = ;
    req.user = decoded as JwtPayload;
    next();
  });
  
};

export default authGaurd;
